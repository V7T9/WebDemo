function closeBanner() {
    document.getElementById('banner').style.display = 'none';
}

async function recommendBook(category) {
    const apiUrl = `https://openlibrary.org/subjects/${category}.json?limit=100`; // 获取指定类别的书籍
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('网络错误');

        const data = await response.json();
        const books = data.works;
        
        if (books.length === 0) {
            document.getElementById('book').innerText = '未找到书籍信息。';
            return;
        }
        
        const randomIndex = Math.floor(Math.random() * books.length);
        const book = books[randomIndex];

        // 显示书籍信息
        const title = book.title || '未知书名';
        const authors = book.authors ? book.authors.map(author => author.name).join(', ') : '未知作者';
        const key = book.key ? `https://openlibrary.org${book.key}` : '#';
        
        document.getElementById('book').innerHTML = `
            <h2>${title}</h2>
            <p>作者: ${authors}</p>
            <a href="${key}" target="_blank">查看书籍详情</a>
        `;
    } catch (error) {
        console.error('获取书籍数据时出错:', error);
        document.getElementById('book').innerText = '无法获取书籍信息。';
    }
}
