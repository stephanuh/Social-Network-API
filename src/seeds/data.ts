export const users = [
    {
        username: 'yellowKat',
        email: 'cattest@test.com',
    },
    {
        username: 'thunderOtter',
        email: 'sea@yahoo.com',
    },
    { 
        username: 'TofuNugget',
         email: 'tofugobbles@snackmail.com' 
        },
    { 
        username: 'sillyGoose',
        email:'duckduck@goose.com',
    },
    { 
        username: 'SpicyMango', 
        email: 'spicymango@fruitopia.net' 
    },
    { 
        username: 'WaffleWizard',
        email: 'wafflewizard@breakfast.org' 
    },
    { 
        username: 'VelociToast', 
        email: 'velocitoast@dino.net' 
    },
    { 
        username: 'BananaOverlord', 
        email: 'bananaoverlord@fruit.gov' 

    },
    { 
        username: 'GuacOdile', 
        email: 'guacodile@avocadomail.com' 

    },
    { 
        username: 'PurrlockHolmes', 
        email: 'purrlock@detectivecats.com' 

    },
    { 
        username: 'NachoAverageJoe', 
        email: 'nacho@cheesy.com' 

    },
    { 
        username: 'ChewBarka', 
        email: 'chewbarka@woofwoof.com' 

    },
    { 
        username: 'SushiShark', 
        email: 'sushishark@oceanrolls.net' 

    },
    { 
        username: 'PawsitiveVibes', 
        email: 'pawsitive@goodvibes.com',
    },
]

const thoughts = [
    "Do fish ever get thirsty?",
    "If I meow at my cat, does she think I'm fluent?",
    "Life is just a series of embarrassing moments we pretend didn't happen.",
    "Why do we say 'heads up' when we actually duck?",
    "If you think about it, the word 'short' is longer than the word 'long.'",
    "When you clean a vacuum cleaner, you become a vacuum cleaner.",
    "If you replace 'W' with 'T' in 'What, Where, and When,' you get the answer to each of them.",
    "Would aliens think socks are just tiny sleeping bags for our feet?",
    "Tell your cat I said pssspsssppsss.",
    "Are cats secretly plotting world domination, or are they just dramatic?",
    "Do cats think in meows, or is that just their human language?",
    
]
const reactions = [
    
    "I love this!",
    "This is amazing!",
    "This is so true!",
    "I never thought of it that way!😱",
    "I'm dead, this is too funny😂💀",
    "😂 LOL, that's too real!",
    "👏👏👏 Well said!",
    "🐱 My cat approves of this message.",
    "❌ Unpopular opinion, but I kind of get it.",
    "😳 I feel called out!",
    "Big brain moment right here.",
    "My cat is judging you for this.",
    "My cat read this and gave me side-eye.",
    "meow meow meow meow",
]

const getRandomItem = (arr: any) =>
    arr[Math.floor(Math.random() * arr.length)];

export const getRandomThought = () => {
    return getRandomItem(thoughts);
}

export const getRandomReaction = () => {
    return getRandomItem(reactions);
}

export const getRandomUsername = () => {
    return getRandomItem(users).username;
}