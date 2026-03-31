// Book database
const bookDatabase = [
    // Psychological / Thriller
    { 
        anime: "death note", 
        book: "Crime and Punishment", 
        author: "Fyodor Dostoevsky", 
        desc: "A brilliant student's psychological descent as he tests his own moral boundaries — intellectual cat-and-mouse with devastating consequences.", 
        genre: "psychological", 
        link: "https://www.goodreads.com/book/show/7144.Crime_and_Punishment" 
    },
    { 
        anime: "monster", 
        book: "The Alienist", 
        author: "Caleb Carr", 
        desc: "A gripping psychological thriller set in 1890s New York, hunting a methodical serial killer with deep philosophical weight.", 
        genre: "thriller", 
        link: "https://www.goodreads.com/book/show/49945.The_Alienist" 
    },
    { 
        anime: "psycho-pass", 
        book: "Do Androids Dream of Electric Sheep?", 
        author: "Philip K. Dick", 
        desc: "A dystopian exploration of morality, justice, and what it means to be human in a system governed by cold algorithms.", 
        genre: "sci-fi", 
        link: "https://www.goodreads.com/book/show/7082.Do_Androids_Dream_of_Electric_Sheep_" 
    },
    
    // Fantasy / Adventure
    { 
        anime: "attack on titan", 
        book: "The Poppy War", 
        author: "R.F. Kuang", 
        desc: "A dark military fantasy about a war orphan who rises through brutal trials, facing gods, genocide, and the cost of power.", 
        genre: "fantasy", 
        link: "https://www.goodreads.com/book/show/35068705-the-poppy-war" 
    },
    { 
        anime: "fullmetal alchemist", 
        book: "Mistborn: The Final Empire", 
        author: "Brandon Sanderson", 
        desc: "A unique magic system based on metal ingestion, rebellion against an immortal tyrant, and brotherhood at its core.", 
        genre: "fantasy", 
        link: "https://www.goodreads.com/book/show/68428.The_Final_Empire" 
    },
    { 
        anime: "demon slayer", 
        book: "The Sword of Kaigen", 
        author: "M.L. Wang", 
        desc: "A breathtaking martial fantasy about family, tradition, and wielding elemental blades against encroaching darkness.", 
        genre: "fantasy", 
        link: "https://www.goodreads.com/book/show/48669370-the-sword-of-kaigen" 
    },
    { 
        anime: "berserk", 
        book: "Between Two Fires", 
        author: "Christopher Buehlman", 
        desc: "Dark medieval fantasy filled with demonic horrors, a brutal antihero, and a journey through a world on the brink of apocalypse.", 
        genre: "dark fantasy", 
        link: "https://www.goodreads.com/book/show/16078319-between-two-fires" 
    },
    
    // Magical / Ghibli / Whimsical
    { 
        anime: "spirited away", 
        book: "The Ocean at the End of the Lane", 
        author: "Neil Gaiman", 
        desc: "A hauntingly beautiful tale of a young boy who discovers a magical world of ancient beings, memory, and wonder.", 
        genre: "magical realism", 
        link: "https://www.goodreads.com/book/show/15783514-the-ocean-at-the-end-of-the-lane" 
    },
    { 
        anime: "your name", 
        book: "The Time Traveler's Wife", 
        author: "Audrey Niffenegger", 
        desc: "A love story fractured across time — emotional, poignant, and deeply connected to fate and memory.", 
        genre: "romance", 
        link: "https://www.goodreads.com/book/show/18619684-the-time-traveler-s-wife" 
    },
    { 
        anime: "howl's moving castle", 
        book: "Howl's Moving Castle", 
        author: "Diana Wynne Jones", 
        desc: "The original novel that inspired the film — witty, magical, and full of charming characters and cursed hats.", 
        genre: "fantasy", 
        link: "https://www.goodreads.com/book/show/6294.Howl_s_Moving_Castle" 
    },
    { 
        anime: "princess mononoke", 
        book: "The Bear and the Nightingale", 
        author: "Katherine Arden", 
        desc: "A fairy tale set in medieval Russia, where ancient spirits clash with the arrival of Christianity and a brave girl defends her home.", 
        genre: "historical fantasy", 
        link: "https://www.goodreads.com/book/show/25489134-the-bear-and-the-nightingale" 
    },
    
    // Sci-Fi / Cyberpunk
    { 
        anime: "ghost in the shell", 
        book: "Neuromancer", 
        author: "William Gibson", 
        desc: "The quintessential cyberpunk novel — AI, cyberspace, and a tangled heist that questions the soul in a digital age.", 
        genre: "sci-fi", 
        link: "https://www.goodreads.com/book/show/6088007-neuromancer" 
    },
    { 
        anime: "steins;gate", 
        book: "Dark Matter", 
        author: "Blake Crouch", 
        desc: "A mind-bending thriller about alternate realities, quantum choices, and the terrifying cost of changing the past.", 
        genre: "sci-fi", 
        link: "https://www.goodreads.com/book/show/27833670-dark-matter" 
    },
    
    // Emotional / Slice of Life
    { 
        anime: "violet evergarden", 
        book: "The Book Thief", 
        author: "Markus Zusak", 
        desc: "A profoundly emotional story about words, loss, and a young girl finding her voice during WWII — poignant and beautiful.", 
        genre: "historical fiction", 
        link: "https://www.goodreads.com/book/show/19063.The_Book_Thief" 
    },
    { 
        anime: "march comes in like a lion", 
        book: "A Man Called Ove", 
        author: "Fredrik Backman", 
        desc: "A grumpy yet lovable man finds unexpected connection, healing, and purpose — a warm, character-driven journey.", 
        genre: "contemporary", 
        link: "https://www.goodreads.com/book/show/18774964-a-man-called-ove" 
    }
];

// Recommendation function
function getRecommendation(animeName) {
    if (!animeName || animeName.trim() === "") return null;
    
    const searchTerm = animeName.toLowerCase().trim();
    
    // Find exact or partial match
    let bestMatch = null;
    let bestScore = 0;
    
    for (const entry of bookDatabase) {
        const animeEntry = entry.anime.toLowerCase();
        if (animeEntry === searchTerm) {
            bestMatch = entry;
            break;
        }
        if (animeEntry.includes(searchTerm) || searchTerm.includes(animeEntry)) {
            const score = Math.min(animeEntry.length, searchTerm.length) / Math.max(animeEntry.length, searchTerm.length);
            if (score > bestScore) {
                bestScore = score;
                bestMatch = entry;
            }
        }
    }
    
    // Fallback if no direct match
    if (!bestMatch) {
        const keywords = searchTerm.split(' ');
        let genreMatch = null;
        for (const entry of bookDatabase) {
            for (const kw of keywords) {
                if (kw.length > 3 && (entry.genre.includes(kw) || entry.desc.toLowerCase().includes(kw))) {
                    genreMatch = entry;
                    break;
                }
            }
            if (genreMatch) break;
        }
        if (genreMatch) bestMatch = genreMatch;
        else bestMatch = bookDatabase[Math.floor(Math.random() * bookDatabase.length)];
    }
    
    return bestMatch;
}