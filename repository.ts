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
  type: 'Residential' | 'Visitor' | string,
  starts: string;
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

const permit = {
  "_id": new ObjectId(),
  "firstName": "Hooman",
  "lastName": "Bolandi",
  "email": "hooman.bolandi@gmail.com",
  "liscensePlate": "333DEF",
  "phone": "412-456-5800",
  "zone": "DIA",
  "type": "Residential",
  "starts": "Thu, Jun 01, 2021 @ 09:02 Pm",
  "ends": "Sat, Jun 01, 2023 @ 09:02 Pm",
  "employer": 0,
  residential: [],
  visitor: [

    {
      "_id": new ObjectId(),
      "firstName": "Emma",
      "lastName": "Doe",
      "email": "Emma.Doe@gmail.com",
      "liscensePlate": "333DEF",
      "phone": "412-456-5800",
      "zone": "DIA",
      "type": "Visitor",
      "starts": "Thu, Jun 01, 2021 @ 09:02 Pm",
      "ends": "Sat, Jun 01, 2023 @ 09:02 Pm",
       "employer": 0
    }
  ]
}
export const reset = async () => {
  await epermitCollection.remove({});
  await epermitCollection.insertOne(permit)
}

export const removeEpermit = () => epermitCollection.remove({});

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