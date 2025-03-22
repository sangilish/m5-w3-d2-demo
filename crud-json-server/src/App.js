import React, { useState, useEffect } from 'react';
import './App.css';
import CreateList from './CreateList';
import UpdateList from './UpdateList';

function App() {
  const [lists, setLists] = useState([]);
  const [singledata, setSingledata] = useState({
    title: '',
    author: ''
  });

  // input 값 변경 시 state 업데이트
  const handleChange = (event) => {
    const { name, value } = event.target;
    setSingledata(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 새 항목 생성 (POST)
  const createList = () => {
    fetch('http://localhost:3000/lists', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(singledata)
    })
      .then(res => res.json())
      .then(data => {
        getList(); // 생성 후 목록 갱신
      });
  };

  // 전체 목록 가져오기 (GET)
  const getList = () => {
    fetch('http://localhost:3000/lists')
      .then(res => res.json())
      .then(data => {
        setLists(data);
      });
  };

  // 특정 항목을 가져와서 singledata에 저장 (업데이트 전 데이터 로딩)
  const getItem = (id) => {
    // 로딩 상태 표시
    setSingledata({ title: "Loading...", author: "Loading..." });
    fetch(`http://localhost:3000/lists/${id}`)
      .then(res => res.json())
      .then(result => {
        setSingledata({
          title: result.title || "",
          author: result.author || ""
        });
      });
  };

  // 항목 업데이트 (PUT)
  const updateList = (id) => {
    fetch(`http://localhost:3000/lists/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(singledata)
    })
      .then(res => res.json())
      .then(data => {
        getList(); // 업데이트 후 목록 갱신
      });
  };

  useEffect(() => {
    getList(); // 컴포넌트 마운트 시 목록 불러오기
  }, []);

  return (
    <div className="App">
      <h1>My List App</h1>

      {/* CreateList 컴포넌트: 새 항목 추가 */}
      <CreateList
        singledata={singledata}
        handleChange={handleChange}
        createList={createList}
      />

      {/* 목록 표시 */}
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {lists.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.author}</td>
              <td>
                {/* UpdateList 컴포넌트: 업데이트 버튼과 모달 */}
                <UpdateList
                  elementId={item.id}
                  singledata={singledata}
                  handleChange={handleChange}
                  // getItem를 통해 특정 항목 데이터를 불러옴
                  getList={getItem}
                  updateList={updateList}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;