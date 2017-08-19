import React, {PropTypes, Component} from 'react';

import echarts from 'echarts';

const styles = {
  container: {
    width: '100%',
    height: '100%',
    padding: '6px',
    position: 'relative'
  },
  chartContainer: {
    width: '100%',
    height: '100%'
  }
};

class LineChart extends Component {

  constructor(props) {
    super(props);
    this.option = {
      tooltip: {
        trigger: 'item',
        formatter: '<span style="color: #f29603;font-size: 14px">{c}</span> <span>ug/m<sup>2</sup></span>',
        textStyle: {
          fontSize: 12
        }
      },
      xAxis: {
        data: [],
        splitLine: {
          show: true,
          lineStyle: {
            color: 'rgba(0,0,0,0.1)',
            type: 'dotted'
          }
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(0,0,0,0.1)',            
            type: 'dotted'
          }
        },
        axisLabel: {
          textStyle: {
            color: '#000'
          }
        }
      },
      yAxis: {
        max: 300,
        splitLine: {
          show: true,
          lineStyle: {
            color: 'rgba(0,0,0,0.1)',            
            type: 'dotted'
          }
        },
        axisLabel: {
          textStyle: {
            color: '#000'
          }
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(0,0,0,0.1)',
            type: 'dotted'
          }
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '8%',
        containLabel: true
      },
      series: [
        {
          type: 'line',
          data: [],
          areaStyle: {
            normal: {
              color: new echarts
                .graphic
                .LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgba(76,200,131,0.8)' // 0% 处的颜色
                  }, {
                    offset: 0.6,
                    color: 'rgba(76,200,131,0)' // 100% 处的颜色
                  }
                ], false)
            }
          },
          lineStyle: {
            normal: {
              color: '#4cc883',
              width: 1
            }
          },
          itemStyle: {
            normal: {
              color: "#4cc883",
              borderColor: '#4cc883',
              borderWidth: 1
            },
            emphasis: {
              color: "#fff",
              borderColor: '#f18400',
              borderWidth: 2        
            }
          },
          symbolSize: 6
        }
      ]
    };
  }

  componentDidMount() {
    this.lineChart = echarts.init(this.chartDom);
    let option = Object.assign({}, this.option);
    option.series[0].data = this.props.data;
    option.xAxis.data = this.props.label;
    this.lineChart.setOption(option);
  }

  componentWillReceiveProps (nextProps){
    let option = Object.assign({}, this.option);
    option.series[0].data = nextProps.data;
    option.xAxis.data = nextProps.label;
    this.lineChart.setOption(option);
  }
  render() {
    return (
      <div style={styles.container}>
        <div
          style={styles.chartContainer}
          ref={c => {
          this.chartDom = c;
        }}></div>
      </div>
    );
  }
}

LineChart.propTypes = {
  data: PropTypes.array,
  label: PropTypes.array
};
export default LineChart;
