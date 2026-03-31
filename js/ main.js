// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM loaded, initializing...");
    
    // DOM elements
    const recommendBtn = document.getElementById('recommendBtn');
    const animeInput = document.getElementById('animeInput');
    const exampleChips = document.querySelectorAll('.example-chip');
    
    // Check if elements exist
    if (!recommendBtn) console.error("Recommend button not found!");
    if (!animeInput) console.error("Anime input not found!");
    
    // Display recommendation in UI
    function displayRecommendation(animeInputText) {
        console.log("Displaying recommendation for:", animeInputText);
        
        const resultDiv = document.getElementById('resultSection');
        const bookTitleEl = document.getElementById('bookTitle');
        const bookAuthorEl = document.getElementById('bookAuthor');
        const bookDescEl = document.getElementById('bookDesc');
        const bookLinkEl = document.getElementById('bookLink');
        const matchReasonEl = document.getElementById('matchReason');
        
        // Check if getRecommendation function exists
        if (typeof window.getRecommendation !== 'function') {
            console.error("getRecommendation function not found!");
            bookTitleEl.textContent = "Error";
            bookAuthorEl.textContent = "Please refresh the page";
            bookDescEl.textContent = "The recommendation system couldn't load. Try refreshing the page.";
            resultDiv.classList.remove('hidden');
            return;
        }
        
        const book = window.getRecommendation(animeInputText);
        console.log("Book found:", book);
        
        if (book) {
            bookTitleEl.textContent = `📘 ${book.book}`;
            bookAuthorEl.textContent = `✍️ ${book.author}`;
            bookDescEl.textContent = book.desc;
            bookLinkEl.href = book.link;
            matchReasonEl.textContent = `✨ Based on your love for ${animeInputText} ✨`;
            resultDiv.classList.remove('hidden');
            
            // Add a subtle animation effect
            resultDiv.style.transform = 'scale(1.02)';
            setTimeout(() => { resultDiv.style.transform = 'scale(1)'; }, 300);
        } else {
            // Fallback if no book found
            console.log("No book found, using fallback");
            bookTitleEl.textContent = "The Name of the Wind";
            bookAuthorEl.textContent = "Patrick Rothfuss";
            bookDescEl.textContent = "A lyrical fantasy about storytelling, magic, and a legendary figure — perfect for anime lovers seeking rich worldbuilding.";
            bookLinkEl.href = "https://www.goodreads.com/book/show/186074.The_Name_of_the_Wind";
            matchReasonEl.textContent = `📚 For fans of ${animeInputText}`;
            resultDiv.classList.remove('hidden');
        }
    }
    
    // Recommend button click handler
    if (recommendBtn) {
        recommendBtn.addEventListener('click', () => {
            console.log("Button clicked!");
            const anime = animeInput.value.trim();
            console.log("Anime entered:", anime);
            
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
    }
    
    // Enter key handler
    if (animeInput) {
        animeInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                console.log("Enter key pressed");
                recommendBtn.click();
            }
        });
    }
    
    // Example chips click handler
    if (exampleChips.length > 0) {
        exampleChips.forEach(chip => {
            chip.addEventListener('click', () => {
                const anime = chip.getAttribute('data-anime');
                console.log("Example chip clicked:", anime);
                animeInput.value = anime;
                displayRecommendation(anime);
            });
        });
    }
    
    console.log("All event listeners attached successfully");
});