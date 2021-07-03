import mongodb, { Collection, ObjectId } from 'mongodb';
import * as config from './config';

//db connection
const client = new mongodb.MongoClient(config.mongodbUrl,
  { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 10000 });
client.connect(err => {
  if (err) {
    console.error('Exitting since could not connect to mongodb: ' + err);
    process.nextTick(() => process.exit(1));
    return;
  }
  console.log('mongodb connection successful');
});

//db object
const db = client.db('epermit');

interface UserDbo {
  _id?: ObjectId;
  name: string;
}

export interface Permit {
  _id: ObjectId;
  firstName: string,
  lastName: string,
  email: string,
  liscensePlate: string,
  phone: string,
  zone: string,
  type: 'Residential' | 'Visitor',
  stars: string;
  ends: string;
  employer: number;
}

interface PermitDbo extends Permit {
  residential: Permit[],
  visitor: Permit[],
}


const userCollection: Collection<UserDbo> = db.collection('users');
const epermitCollection: Collection<PermitDbo> = db.collection('epermit');


const getter = <T>(collection: Collection<T>, arg?: Partial<T>) => collection.find(arg).toArray();

export const getUser = async (name?: string) => getter(userCollection, name ? { name } : undefined);
export const getPermit = async (_id?: ObjectId) => getter(epermitCollection, _id ? { _id } : undefined);
export const postEpermit = async (epermit: Permit) => epermitCollection.insertOne({
  ...epermit,
  residential: [],
  visitor: [],
});

export const reset = () => {
  return epermitCollection.remove({});
}
export const addPermit = async (permit: Permit, _id: ObjectId) => {
  return epermitCollection.findOne({ _id })
    .then(result => {
      if (!result) throw new Error('No Such Permit: ' + _id);
      permit = { ...permit, _id: new ObjectId() }
      const { residential, visitor } = result;
      const toAdd = permit.type === 'Residential' ? {
        residential: [...residential, permit]
      } : {
        visitor: [...visitor, permit]
      }

      //remove that user
     epermitCollection.updateOne({ _id: result!._id }, {
        $set: toAdd
      }, { upsert: true });

      return {result, ...toAdd}
    })
}