import G6, {Item} from '@antv/g6';
import React, {useEffect} from 'react';
import ReactDom from 'react-dom';
import './style.less';
const data = {
    nodes: [
      {
        id: 'node6',
        groupId: 'group3',
        label: 'rect',
        x: 100,
        y: 300,
      },
      {
        id: 'node1',
        label: 'fck',
        groupId: 'group1',
        x: 100,
        y: 100,
      },
      {
        id: 'node9',
        label: 'noGroup1',
        groupId: 'p1',
        x: 300,
        y: 210,
      },
      {
        id: 'node2',
        label: 'node2',
        groupId: 'group1',
        x: 150,
        y: 200,
      },
      {
        id: 'node3',
        label: 'node3',
        groupId: 'group2',
        x: 300,
        y: 100,
      },
      {
        id: 'node7',
        groupId: 'p1',
        label: 'node7-p1',
        x: 200,
        y: 200,
      },
      {
        id: 'node10',
        label: 'noGroup',
        groupId: 'p2',
        x: 300,
        y: 210,
      },
    ],
    edges: [
      {
        source: 'node1',
        target: 'node2',
      },
      {
        source: 'node2',
        target: 'node3',
      },
    ],
    groups: [
      {
        id: 'group1',
        title: {
          text: '第一个分组',
          stroke: '#444',
          offsetX: -30,
          offsetY: 30,
        },
        parentId: 'p1',
      },
      {
        id: 'group2',
        parentId: 'p1',
      },
      {
        id: 'group3',
        parentId: 'p2',
      },
      {
        id: 'p1',
      },
      {
        id: 'p2',
      },
    ],
  };
  



console.log(Item);
function App(){
    const self = this;
    let graph;
    useEffect(() => {
          fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/relations.json')
          .then(res => res.json())
          .then(json => {
            graph = new G6.Graph({
                container: 'app',
                width: 800,
                height: 500,
                linkCenter: true,
                modes: {
                    default: [
                        'drag-canvas', 
                        'zoom-canvas', 
                        'drag-node',
                        {
                            type: 'tooltip', // 提示框
                            formatText(model) {
                              // 提示框文本内容
                              const text = 'label: ' + model.label + '<br/> class: ' + model.class;
                              return text;
                            },
                          },
                    ], // 允许拖拽画布、放缩画布、拖拽节点
                },
                defaultNode: {
                    size: 15,
                    color: '#5B8FF9',
                    style: {
                      lineWidth: 2,
                      fill: '#C6E5FF'
                    }
                  },
                  defaultEdge: {
                    size: 1,
                    color: '#e2e2e2'
                },
                layout: {
                    type: 'force'
                  },
              });
              // 读取数据
              graph.data(json);
              // 渲染图
              graph.render();
              graph.on('node:click', (ev) => {
                  console.log(ev.item);
                ev.item.hide();
              })
          })
         
    }, [])
    const handleMouseDown = () => {
        console.log(graph);

    }
    return(
        <div className="box">
          <div className="left">
            <div style={{cursor:'pointer'}} onMouseDown={handleMouseDown} draggable="true">
              <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxjaXJjbGUgaWQ9ImIiIGN4PSIzNiIgY3k9IjM2IiByPSIzNiIvPjxmaWx0ZXIgeD0iLTkuNyUiIHk9Ii02LjklIiB3aWR0aD0iMTE5LjQlIiBoZWlnaHQ9IjExOS40JSIgZmlsdGVyVW5pdHM9Im9iamVjdEJvdW5kaW5nQm94IiBpZD0iYSI+PGZlT2Zmc2V0IGR5PSIyIiBpbj0iU291cmNlQWxwaGEiIHJlc3VsdD0ic2hhZG93T2Zmc2V0T3V0ZXIxIi8+PGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iMiIgaW49InNoYWRvd09mZnNldE91dGVyMSIgcmVzdWx0PSJzaGFkb3dCbHVyT3V0ZXIxIi8+PGZlQ29tcG9zaXRlIGluPSJzaGFkb3dCbHVyT3V0ZXIxIiBpbjI9IlNvdXJjZUFscGhhIiBvcGVyYXRvcj0ib3V0IiByZXN1bHQ9InNoYWRvd0JsdXJPdXRlcjEiLz48ZmVDb2xvck1hdHJpeCB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAuMDQgMCIgaW49InNoYWRvd0JsdXJPdXRlcjEiLz48L2ZpbHRlcj48L2RlZnM+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0IDIpIj48dXNlIGZpbGw9IiMwMDAiIGZpbHRlcj0idXJsKCNhKSIgeGxpbms6aHJlZj0iI2IiLz48dXNlIGZpbGwtb3BhY2l0eT0iLjkyIiBmaWxsPSIjRkZGMkU4IiB4bGluazpocmVmPSIjYiIvPjxjaXJjbGUgc3Ryb2tlPSIjRkZDMDY5IiBjeD0iMzYiIGN5PSIzNiIgcj0iMzUuNSIvPjwvZz48dGV4dCBmb250LWZhbWlseT0iUGluZ0ZhbmdTQy1SZWd1bGFyLCBQaW5nRmFuZyBTQyIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIuNjUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDQgMikiPjx0c3BhbiB4PSIyMyIgeT0iNDEiPlN0YXJ0PC90c3Bhbj48L3RleHQ+PC9nPjwvc3ZnPg==" alt="flow-circle" draggable="false"/>
            </div>
          </div>
          
          <div className="right"><div id="app"></div></div>
        </div>
    )
}



document.querySelector('#box') && ReactDom.render(<App/>, document.querySelector('#box'))





if('serviceWorker' in navigator){
  navigator.serviceWorker.register('./worker/sw.js').then(json => {
      console.log(json);
  }).catch(err => {
      console.log(err);
  })
}






