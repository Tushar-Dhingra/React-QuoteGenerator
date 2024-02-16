const { useState, useEffect } = React;

function RandomQuote() {
    const [quote, setQuote] = useState('')
    const randomRgb = () => {
        const { round, random } = Math;
        const rgb = () => round(random() * 255)
        console.log('color')
        return `rgb(${rgb()},${rgb()},${rgb()})`;
    };
    const [classs, setClass] = useState({ fade: false, color: randomRgb() })
    const logic = classs.fade ? 'fade-in' : 'fade-out'
    useEffect(() => {
        if (quote) {
            setClass({ fade: true, color: randomRgb() })
        }
    }, [quote]);

    const body = document.querySelector('body')
    body.style.backgroundColor = classs.color
    body.classList.add('transition')

    function removeClass() {
        setClass({ ...classs, fade: false })
    }
    async function getRandomQuote() {
        removeClass()
        const getData = await fetch("https://type.fit/api/quotes")
        const data = await getData.json()
        const random = Math.floor(Math.random() * data.length)
        setQuote({ quote: data[random].text, author: data[random].author })
    }
  const index= quote.author&& quote.author.indexOf(',')
  const newStr = quote.author&& quote.author.slice(0,index)
  
    return (
        <>
            <div id="quote-box" >
                {!quote && <h2 style={{ color: classs.color }}>Click Get quotes to generate a random quote!</h2>}
                <h2 id='text' className={logic}
                    style={{ color: classs.color }}>
                    &ldquo;{quote.quote}&rdquo;
                </h2>
                <h3 id='author' className={logic} style={{ color: classs.color }}>- {newStr!=='type.fi' ? newStr : 'Baaz Cheema'}</h3>
                <button id='new-quote'
                    onClick={getRandomQuote}
                    style={{ color: "white", backgroundColor: classs.color }}
                    className="transition"
                >Get Quote</button>
                <a id='tweet-quote'
                    className="transition"
                    style={{ backgroundColor: classs.color }}
                    href={`https://twitter.com/intent/tweet?text=${quote.quote} -${quote.author}`}>
                  <i 
                    class='bx bxl-twitter'></i>
                </a>
            </div >

        </>
    )
}
ReactDOM.render(<RandomQuote/>, document.getElementById('root'));