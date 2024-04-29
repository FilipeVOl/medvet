import axios from "axios";

export function postAluno(data) {
  axios
    .post("http://localhost:3333/users/student", data)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}
