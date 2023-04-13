import { ResponsiveLine } from '@nivo/line';
import ReactDOM from "react-dom/client";
import * as React from 'react';

const AnnotationDefaultData = [
    {"1": "NodeID:1"},
    {"2": "Lcom:cLCB1"},
    {"3": "Dx=0.000,Dy=0.0002,Dz=0.0002"},
    {"4": "Rx=0.000,Ry=0.00003,Rz=0.000043"},
  ]
  

// const AnnotationData= React.useState(AnnotationDefaultData);

export default function MyResponsiveLine (props){
  return(
    <ResponsiveLine
      data={props.data}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: 'linear' , min: 'auto', max: 'auto'}}
      xFormat=" >-.2f"
      yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
        
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
          orient: 'bottom',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Node No',
          legendOffset: 36,
          legendPosition: 'middle'
      }}
      axisLeft={{
          orient: 'left',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'count',
          legendOffset: -40,
          legendPosition: 'middle'
      }}
      pointSize={10}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabelYOffset={-12}
      useMesh={true}
      tooltip={point => {
        return (<div
            style={{
                background: 'skyblue',
                padding: '9px 12px',
                border: '1px solid #ccc',
            }}
        >
              {AnnotationDefaultData.map((value, idx) => {
                        return <div key={idx} value={10}>{value[idx+1]}</div>
                      })}
        </div>);
      }}
    //   sliceTooltip={({ slice }) => {
    //     return (
    //         <div
    //             style={{
    //                 background: 'white',
    //                 padding: '9px 12px',
    //                 border: '1px solid #ccc',
    //             }}
    //         >
    //             <div>x: {slice.id}</div>
    //             {slice.points.map(point => (
    //                 <div
    //                     key={point.id}
    //                     style={{
    //                         color: point.serieColor,
    //                         padding: '3px 0',
    //                     }}
    //                 >
    //                     <strong>Rahul</strong> [{point.data.yFormatted}]
    //                 </div>
    //             ))}
    //         </div>
    //     )
    //  }}      
      legends={[
          {
            
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: 'left-to-right',
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: 'circle',
              symbolBorderColor: 'rgba(0, 0, 0, .5)',
              effects: [
                  {
                      on: 'hover',
                      style: {
                          itemBackground: 'rgba(0, 0, 0, .03)',
                          itemOpacity: 1
                      }
                  }
              ]
          }
      ]}
  />
  )
}

