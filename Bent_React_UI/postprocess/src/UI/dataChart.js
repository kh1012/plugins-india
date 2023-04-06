import { ResponsiveLine } from '@nivo/line';

const data = [
  {
    "id": "japan",
    "color": "hsl(279, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 22
      },
      {
        "x": "helicopter",
        "y": 280
      },
      {
        "x": "boat",
        "y": 51
      },
      {
        "x": "train",
        "y": 132
      },
      {
        "x": "subway",
        "y": 60
      },
      {
        "x": "bus",
        "y": 111
      },
      {
        "x": "car",
        "y": 250
      },
      {
        "x": "moto",
        "y": 279
      },
      {
        "x": "bicycle",
        "y": 107
      },
      {
        "x": "horse",
        "y": 147
      },
      {
        "x": "skateboard",
        "y": 8
      },
      {
        "x": "others",
        "y": 24
      }
    ]
  },
  {
    "id": "france",
    "color": "hsl(104, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 285
      },
      {
        "x": "helicopter",
        "y": 219
      },
      {
        "x": "boat",
        "y": 1
      },
      {
        "x": "train",
        "y": 238
      },
      {
        "x": "subway",
        "y": 276
      },
      {
        "x": "bus",
        "y": 168
      },
      {
        "x": "car",
        "y": 132
      },
      {
        "x": "moto",
        "y": 276
      },
      {
        "x": "bicycle",
        "y": 104
      },
      {
        "x": "horse",
        "y": 282
      },
      {
        "x": "skateboard",
        "y": 298
      },
      {
        "x": "others",
        "y": 58
      }
    ]
  },
  {
    "id": "us",
    "color": "hsl(342, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 104
      },
      {
        "x": "helicopter",
        "y": 134
      },
      {
        "x": "boat",
        "y": 82
      },
      {
        "x": "train",
        "y": 142
      },
      {
        "x": "subway",
        "y": 126
      },
      {
        "x": "bus",
        "y": 206
      },
      {
        "x": "car",
        "y": 218
      },
      {
        "x": "moto",
        "y": 56
      },
      {
        "x": "bicycle",
        "y": 55
      },
      {
        "x": "horse",
        "y": 150
      },
      {
        "x": "skateboard",
        "y": 68
      },
      {
        "x": "others",
        "y": 182
      }
    ]
  },
  {
    "id": "germany",
    "color": "hsl(57, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 144
      },
      {
        "x": "helicopter",
        "y": 16
      },
      {
        "x": "boat",
        "y": 163
      },
      {
        "x": "train",
        "y": 41
      },
      {
        "x": "subway",
        "y": 93
      },
      {
        "x": "bus",
        "y": 3
      },
      {
        "x": "car",
        "y": 145
      },
      {
        "x": "moto",
        "y": 7
      },
      {
        "x": "bicycle",
        "y": 31
      },
      {
        "x": "horse",
        "y": 123
      },
      {
        "x": "skateboard",
        "y": 41
      },
      {
        "x": "others",
        "y": 94
      }
    ]
  },
  {
    "id": "norway",
    "color": "hsl(98, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 25
      },
      {
        "x": "helicopter",
        "y": 185
      },
      {
        "x": "boat",
        "y": 25
      },
      {
        "x": "train",
        "y": 115
      },
      {
        "x": "subway",
        "y": 42
      },
      {
        "x": "bus",
        "y": 36
      },
      {
        "x": "car",
        "y": 200
      },
      {
        "x": "moto",
        "y": 54
      },
      {
        "x": "bicycle",
        "y": 3
      },
      {
        "x": "horse",
        "y": 288
      },
      {
        "x": "skateboard",
        "y": 192
      },
      {
        "x": "others",
        "y": 247
      }
    ]
  }
]

export default function MyResponsiveLine (props){

  return(
    <ResponsiveLine
      data={data}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: 'point' }}
      xFormat=" >-.2f"
      yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
          stacked: true,
          reverse: false
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
          orient: 'bottom',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'transportation',
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

