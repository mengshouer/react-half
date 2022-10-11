import { Tabs } from "antd";
import Pie from "./components/pie";
import Curve from "./components/curve";
import "./index.less";
import BookSum from "./images/book-sum.png";
import AddPerson from "./images/add_person.png";
import AddTeam from "./images/add_team.png";
import Today from "./images/today.png";
import BookSum1 from "./images/book_sum.png";

const DataVisualize = () => {
  const onChange = (key: string) => {
    console.log(key);
  };

  const tabsList = [
    { label: "未来7日", key: "item-1" },
    { label: "近七日", key: "item-2" },
    { label: "近一月", key: "item-3" },
    { label: "近三月", key: "item-4" },
    { label: "近半年", key: "item-5" },
    { label: "近一年", key: "item-6" },
  ];

  return (
    <div className="dataVisualize-box">
      <div className="top-box">
        <div className="top-title">数据可视化</div>
        <Tabs defaultActiveKey="1" onChange={onChange} items={tabsList} />
        <div className="top-content">
          <div className="item-left sle">
            <span className="left-title">访问总数</span>
            <div className="img-box">
              <img src={BookSum} alt="" />
            </div>
            <span className="left-number">848.132w</span>
          </div>
          <div className="item-center">
            <div className="gitee-traffic traffic-box">
              <div className="traffic-img">
                <img src={AddPerson} alt="" />
              </div>
              <span className="item-value">2222</span>
              <span className="traffic-name sle">Gitee 访问量</span>
            </div>
            <div className="gitHub-traffic traffic-box">
              <div className="traffic-img">
                <img src={AddTeam} alt="" />
              </div>
              <span className="item-value">2222</span>
              <span className="traffic-name sle">GitHub 访问量</span>
            </div>
            <div className="today-traffic traffic-box">
              <div className="traffic-img">
                <img src={Today} alt="" />
              </div>
              <span className="item-value">4567</span>
              <span className="traffic-name sle">今日访问量</span>
            </div>
            <div className="yesterday-traffic traffic-box">
              <div className="traffic-img">
                <img src={BookSum1} alt="" />
              </div>
              <span className="item-value">1234</span>
              <span className="traffic-name sle">昨日访问量</span>
            </div>
          </div>
          <div className="item-right">
            <div className="echarts-title">Gitee / GitHub 访问量占比</div>
            <div className="book-echarts">
              <Pie />
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-box">
        <div className="bottom-title">数据来源</div>
        <div className="bottom-tabs">
          <Tabs defaultActiveKey="1" onChange={onChange} items={tabsList} />
        </div>
        <div className="curve-echarts">
          <Curve />
        </div>
      </div>
    </div>
  );
};

export default DataVisualize;
