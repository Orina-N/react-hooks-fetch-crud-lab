import React, {useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([])
  useEffect(()=> {
    fetch("http://localhost:4000/questions")
    .then(res => res.json())
    .then(data => setQuestions(data))
  },[])
  //console.log(questions);

  function deleteQuestion (id) {
    fetch(`http://localhost:4000/questions/${id}`,{
      method:"DELETE",
    })
    .then(res => res.json())
    .then(() => {
      const updatedQuestions = questions.filter((q) => q.id !== id)
      setQuestions(updatedQuestions)
    })
  }


  const renderQuestions = questions.map((q) => {  
    return(
      <QuestionItem
      key={q.id}
      question={q}
      onDeleteClick={deleteQuestion}/>
    )
  })
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{renderQuestions}</ul>
    </section>
  );
}

export default QuestionList;