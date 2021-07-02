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
            padding='1.5em 1.5em 0 1.5em'
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
                    onChange={eventIds => selectEnterpriseEvent(eventIds)}
                    value={enterpriseEvent.id}>
                    {enterpriseEvents.map(e => (
                        <Select.Option
                            key={e.id}
                            className='capitalize'
                            value={e.id}>
                            {e.name}
                        </Select.Option>))}
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


           <ScoreCard title='Total Revenue' faIcon='fa fa-money' hoverLabel='Total Revenue' borderRight>
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

            <ScoreCard title='Citations' faIcon='fas fa-money-check-alt' hoverLabel='Revenue' borderRight>
                {loading
                    ? <Loader.Spinner color='inherit' />
                    : <span className='txt-lgx'>{data ? enterpriseEvent.transaction : 'N/A'}</span>
                }
            </ScoreCard>

            <ScoreCard title='Cars Towed' faIcon='fas fa-money-check-alt' hoverLabel='Revenue' borderRight>
                {loading
                    ? <Loader.Spinner color='inherit' />
                    : <span className='txt-lgx'>{data ? enterpriseEvent.towedCars : 'N/A'}</span>
                }
            </ScoreCard>

            <ScoreCard title='Top Violation' faIcon='fas fa-money-check-alt' hoverLabel='Revenue' borderRight>
            <Text color='white' size={'1.1em'}>Street Cleaning ({enterpriseEvent.street ||  272})</Text>
             <Text color='white' size={'1.1em'}>Parking on grades ({enterpriseEvent.grades ||8})</Text>
             <Text color='white' size={'1.1em'}>Sidewalk ({enterpriseEvent.sidewalk || 7})</Text>
      
            </ScoreCard>
            <ScoreCard title='Performance' faIcon='fa fa-car' hoverLabel='Occupancy Count' span={1}>
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
                            map={(({ garageName, occupancy, staffs, expStaffs }: any) => {
                                return (
                                    <Grid customCols='1fr auto'>
                                        <span className='txt-overflow'style={{color: 'white'}}>{garageName}</span>
                                        <ScoreCard.PercentBar
                                            status
                                            percent={occupancy * 100}
                                            text={`${occupancy * 100}%`}
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

export default Header;
