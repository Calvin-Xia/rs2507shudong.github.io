// 获取所有问题
function getQuestions() {
    const data = localStorage.getItem('questions');
    return data ? JSON.parse(data) : [];
}

// 新增问题
function addQuestion(question) {
    const questions = getQuestions();
    questions.push(question);
    localStorage.setItem('questions', JSON.stringify(questions));
}

// 回答问题
function answerQuestion(index, answer) {
    const questions = getQuestions();
    if (questions[index]) {
        questions[index].answer = answer;
        questions[index].answeredAt = new Date().toISOString();
        localStorage.setItem('questions', JSON.stringify(questions));
    }
}
