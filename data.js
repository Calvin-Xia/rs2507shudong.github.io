// 引入 LeanCloud SDK
// 你需要填写 YOUR_APP_ID 和 YOUR_APP_KEY
AV.init({
    appId: 'epdklQYEV1cWCUc8BJmBvVlx-gzGzoHsz',
    appKey: 'FsEZHvHU2wp3Lm1dCSkO8JgV',
    serverURLs: 'https://epdklqye.lc-cn-n1-shared.com' // ← 这里填写 LeanCloud 控制台提供的 API 域名
});

const Question = AV.Object.extend('Question');

// 获取所有问题
async function getQuestions() {
    const query = new AV.Query('Question');
    query.ascending('createdAt');
    const results = await query.find();
    return results.map(obj => {
        const data = obj.toJSON();
        data.objectId = obj.id;
        return data;
    });
}

// 新增问题
async function addQuestion(question) {
    const q = new Question();
    Object.keys(question).forEach(k => q.set(k, question[k]));
    q.set('createdAt', new Date()); // 插入此行，确保 createdAt 为 Date 类型
    await q.save();
}

// 回答问题
async function answerQuestion(objectId, answer) {
    const q = AV.Object.createWithoutData('Question', objectId);
    q.set('answer', answer);
    q.set('answeredAt', new Date().toISOString());
    await q.save();
}

// 删除问题
async function deleteQuestion(objectId) {
    const q = AV.Object.createWithoutData('Question', objectId);
    await q.destroy();
}

window.getQuestions = getQuestions;
window.addQuestion = addQuestion;
window.answerQuestion = answerQuestion;
window.deleteQuestion = deleteQuestion;
