// Display recommendation in UI
function displayRecommendation(animeInput) {
    const resultDiv = document.getElementById('resultSection');
    const bookTitleEl = document.getElementById('bookTitle');
    const bookAuthorEl = document.getElementById('bookAuthor');
    const bookDescEl = document.getElementById('bookDesc');
    const bookLinkEl = document.getElementById('bookLink');
    const matchReasonEl = document.getElementById('matchReason');
    
    const book = getRecommendation(animeInput);
    
    if (book) {
        bookTitleEl.textContent = `📘 ${book.book}`;
        bookAuthorEl.textContent = `✍️ ${book.author}`;
        bookDescEl.textContent = book.desc;
        bookLinkEl.href = book.link;
        matchReasonEl.textContent = `✨ Based on your love for ${animeInput} ✨`;
        resultDiv.classList.remove('hidden');
        
        // Add a subtle animation effect
        resultDiv.style.transform = 'scale(1.02)';
        setTimeout(() => { resultDiv.style.transform = 'scale(1)'; }, 300);
    } else {
        // Fallback recommendation
        bookTitleEl.textContent = "The Name of the Wind";
        bookAuthorEl.textContent = "Patrick Rothfuss";
        bookDescEl.textContent = "A lyrical fantasy about storytelling, magic, and a legendary figure — perfect for anime lovers seeking rich worldbuilding.";
        bookLinkEl.href = "https://www.goodreads.com/book/show/186074.The_Name_of_the_Wind";
        matchReasonEl.textContent = `📚 Inspired by your anime taste`;
        resultDiv.classList.remove('hidden');
    }
}

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // DOM elements
    const recommendBtn = document.getElementById('recommendBtn');
    const animeInput = document.getElementById('animeInput');
    const exampleChips = document.querySelectorAll('.example-chip');
    
    // Recommend button click handler
    recommendBtn.addEventListener('click', () => {
        const anime = animeInput.value.trim();
        if (anime === "") {
            animeInput.placeholder = "Tell me your favorite anime! ✨";
            animeInput.style.borderColor = "#f472b6";
            setTimeout(() => { 
                animeInput.style.borderColor = "rgba(255,255,255,0.3)"; 
            }, 1500);
            return;
        }
        displayRecommendation(anime);
    });
    
    // Enter key handler
    animeInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            recommendBtn.click();
        }
    });
    
    // Example chips click handler
    exampleChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const anime = chip.getAttribute('data-anime');
            animeInput.value = anime;
            displayRecommendation(anime);
        });
    });
});