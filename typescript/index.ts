import axios from 'axios';

const url = 'https://jsonplaceholder.typicode.com/todos/1';

// interfaceはクラスが実装すべきフィールドやメソッドを定義した型
interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

axios.get(url).then(response => {
  const todo = response.data as Todo;
  
  const id = todo.id;
  const title = todo.title;
  const completed = todo.completed;
  logTodo(id, title, completed )
});

const logTodo = (id:number, title:string, completed:boolean) => {
  console.log(`ID:${id},title:${title},completed:${completed}`);
};
