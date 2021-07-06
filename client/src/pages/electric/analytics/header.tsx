import React, { useEffect, useMemo } from 'react';
import { Grid, Header as Text, List, Empty , Loader} from 'platyplex_ui';
import { ScoreCard } from '../../../components/score-card/old-score-card';
import { overflow } from '../../../utils/text';
import { moment } from '../../../utils/time';
import { invertedTxtColor } from '../../../config';
import PieChart from '../../../components/chart/components/graph/pie-chart'
import { getEnterpriseEvents, useSelectEnterpriseEvent, Stats } from '../model';
import { Select } from 'antd';
import usePromise from '../../../hooks/promise_hook';
import { toCurrency } from '../../../utils';
import { useParams } from 'react-router';
import { electricPermits } from './electric-table';

const enterpriseEvents = getEnterpriseEvents();

const Header = () => {
    const { id } = useParams<{id: any}>();

    const { enterpriseEvent, selectEnterpriseEvent} = useSelectEnterpriseEvent();
    const { data, loading } = usePromise<Stats>(useMemo(() => enterpriseEvent.getAnalyticsStats('5f0387891c154a299fc0104f'),
        []));

    useEffect(()=>{
        switch(id){
            case '3':   
            selectEnterpriseEvent('5b345cb3ea260d03b87438dd22')
            break;

            case '2':  
            selectEnterpriseEvent('5b345cb3ea260d03b87438de')
            break;

            default: 
            selectEnterpriseEvent('5b345cb3ea260d03b87438dd')
        }
    }, [id])
    return (
        <Grid
            cols='5'
            style={{ gridColumn: '1/-1', marginBottom: '1em' }}
            width='100%'
            gridGap='.25em'
            padding='1em 1em 0 1em'
        >
            <div
                id='header'
                className='grid'
                style={{
                    width: '100%',
                    margin: '0 0 .75em 0',
                    gridColumn: '1/-1',
                    gridTemplateColumns: '1fr auto'
                }}>
                <Select
                    style={{ width: '300px', placeSelf: 'start', color: 'white' }}
                    disabled={loading}
                    placeholder="Select"
                    value={'7925 Central Avenue Capitol Heights, MD 20743'}
                    >
      
                        <Select.Option
                    
                            value={"7925 Central Avenue Capitol Heights, MD 20743"}>
                           7925 Central Avenue Capitol Heights, MD 20743
                        </Select.Option>
                </Select>
                <Select
                    style={{ width: '300px', placeSelf: 'start', color: 'white' }}
                    disabled={loading}
                    placeholder="Select"
                    onChange={eventIds => selectEnterpriseEvent(eventIds)}
                    value={'Weekly'}>
                {['Weekly', 'Daily', 'Monthly'].map((e)=> <Select.Option value={e}>{e}</Select.Option>)}
                </Select>
                <div>
                </div>
                <Text size={4.6} color={invertedTxtColor} className='hide-mobile'>  Updated at: {moment().format('hh:mm A')}</Text>
                   
                
            </div>


           <ScoreCard title='Total Money Spent Maintaining Vehicles' faIcon='fa fa-money' hoverLabel='Total Revenue' borderRight>
                {loading
                    ? <Loader.Spinner color='inherit' />
                    : <PieChart
                        height={130}
                        width={130}
                        text={data ? toCurrency(enterpriseEvent.revenueAmt) : 'N/A'}
                        data={data ? [
                            { label: `Normal Pricing (${1000} total)`, value: data.revenue.normal },
                        ] : [{ label: 'N/A', value: 'N/A' }]} />
                }

            </ScoreCard>

            <ScoreCard title='Electric Vehicles Parked' faIcon='fas fa-money-check-alt' hoverLabel='Revenue' borderRight>
                {loading
                    ? <Loader.Spinner color='inherit' />
                    : <span className='txt-lgx'>{data ? enterpriseEvent.transaction : 'N/A'}</span>
                }
            </ScoreCard>

            <ScoreCard title='Electric Vehicles Fully Charged' faIcon='fas fa-money-check-alt' hoverLabel='Revenue' borderRight>
                {loading
                    ? <Loader.Spinner color='inherit' />
                    : <span className='txt-lgx'>{data ? enterpriseEvent.towedCars : 'N/A'}</span>
                }
            </ScoreCard>

            <ScoreCard title='Top Maintenance Issues' faIcon='fas fa-money-check-alt' hoverLabel='Revenue' borderRight>
            <Text color='white' size={'1.1em'}>Electronics ({enterpriseEvent.street ||  272})</Text>
             <Text color='white' size={'1.1em'}>Breaks ({enterpriseEvent.grades ||8})</Text>
             <Text color='white' size={'1.1em'}>Transmission ({enterpriseEvent.sidewalk || 7})</Text>
      
            </ScoreCard>
            <ScoreCard title='Charge Status @ Drop off' faIcon='fa fa-car' hoverLabel='Occupancy Count' span={1}>
                <Grid placeSelf='start' >
                    <Grid
              
                        placeItems='stretch'
                        width='100%'
                        color='white'
                        gridGap='.2em 1.5em'
                    >
                        <List
                            loading={loading}
                            empty={
                                <div style={{ gridColumn: '1/-1' }}>
                                    <Empty text={'No Garage Occupancy'} color="white" style={{ width: '7em', margin: '0 auto' }} />
                                </div>
                            }
                            pagination={{ items: 3 }}
                            list={enterpriseEvent.reservationOccupancy}
                            map={(({ garageName, occupancy, staffs, expStaffs }: any, i: number) => {
                                return (
                                    <Grid customCols='1fr auto'>
                                        <span className='txt-overflow'style={{color: 'white'}}>{electricPermits[i].firstName + " "+ electricPermits[i].lastName}</span>
                                        <ScoreCard.PercentBar
                                            status
                                            percent={datas[i]}
                                            text={`${datas[i]}%`}
                                        />
                                   
                                    </Grid>
                                )
                            })}
                        />
                    </Grid>
                </Grid>
            </ScoreCard>
        </Grid>);
}

const datas = [100, 100, 92]

export default Header;
