import { ResponsiveLine } from '@nivo/line';
import ReactDOM from "react-dom/client";
import * as React from 'react';
var index;
var Arry=[]

// const AnnotationDefaultData = [
//     {"1": "NodeID:1"},
//     {"2": "Lcom:cLCB1"},
//     {"3": "Dx=0.000,Dy=0.0002,Dz=0.0002"},
//     {"4": "Rx=0.000,Ry=0.00003,Rz=0.000043"},
//   ]
// const AnnotationDefaultData=[];
  

// const AnnotationData= React.useState(AnnotationDefaultData);

export default function MyResponsiveLine (props){
  return(
    <ResponsiveLine
      data={props.data}
      margin={{ top: 50, right: 110, bottom: 80, left: 50 }}
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
          legend:props.GM,
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
      tooltip={point => (
        <div
          style={{
            color: "white",
            background: '#333',
            padding: '12px 16px',
          }}
        >
          <strong>Values:</strong>
          <br />
          {`x: ${point.point.data.x}`}
          <br />
          {`y: ${point.point.data.y}`}
        </div>
      )}
      
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

