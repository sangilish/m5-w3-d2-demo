import React from "react";
import Lists from "./Lists";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false, // 로딩 상태
      alldata: [], // 전체 데이터 저장
    };
  }

  // 📌 JSON Server에서 데이터 가져오는 함수
  getLists = () => {
    this.setState({ loading: true });

    fetch("http://localhost:5000/posts") // JSON Server 엔드포인트
      .then((res) => res.json()) // 응답을 JSON으로 변환
      .then((data) => {
        this.setState({ alldata: data, loading: false });
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        this.setState({ loading: false });
      });
  };

  render() {
    return (
      <div className="container">
        <h1>REST API Test</h1>
        
        {/* 버튼 클릭 시 getLists 함수 호출 */}
        <button
          type="button"
          className="btn btn-primary"
          onClick={this.getLists}
        >
          Get Lists
        </button>

        {/* 로딩 중이면 메시지, 아니면 리스트 출력 */}
        {this.state.loading ? (
          <p>Loading...</p>
        ) : (
          <Lists alldata={this.state.alldata} />
        )}
      </div>
    );
  }
}

export default App;