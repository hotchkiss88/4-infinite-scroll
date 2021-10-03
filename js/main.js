console.log("działa");

let endOfThePage = 0;

let preloading = false;

const showPreloder = () => {

    let preloader = document.querySelector('.fa-spinner');
    console.log(`showPreloader()`);
    preloader.style.display = 'block';
    preloading = true;
}

const hidePreloder = () => {

    let preloader = document.querySelector('.fa-spinner');
    console.log(`hidePreloader()`);
    preloader.style.display = 'none';
    preloading = false;
}


const getData = () => {
    if (!preloading) {

        showPreloder();

        fetch('https://akademia108.pl/api/ajax/get-users.php')
            .then(res => res.json())
            .then(data => {

                let body = document.body;
                let hr = document.createElement('hr');
                body.appendChild(hr);

                for (let user of data) {
                    let pId = document.createElement('p');
                    let pName = document.createElement('p');
                    let pWebsite = document.createElement('p');

                    pId.innerText = `User ID: ${user.id}`;

                    pName.innerText = `User Name: ${user.name }`;

                    pWebsite.innerHTML = `User URL: ${user.pWebside} <br/>--------`;

                    body.appendChild(pId);
                    body.appendChild(pName);
                    body.appendChild(pWebsite);
                }

                hidePreloder();

                console.log(data);
            })
            .catch(error => {
                console.log(error);
            });
    }
};
const scrollToEndOfPage = () => {

    let d = document.documentElement;

    // height of an element's content, including content not visible on the screen
    let scrollHeight = d.scrollHeight;

    // number of pixels that an element's content is scrolled vertically 
    let scrollTop = d.scrollTop;

    // inner height of an element in pixels
    let clientHeight = d.clientHeight;


    let sumScrollTopCilentHeight = Math.ceil(scrollTop) + clientHeight

    console.log(`
                scrollHeight: $ { scrollHeight }
                `);

    console.log(sumScrollTopCilentHeight);

    console.log(`
                scrollTop: $ { scrollTop }
                `);

    console.log(`
                clientlHeight:
                $ { clientHeight }
                `);

    console.log(` === === === === === `);

    if (sumScrollTopCilentHeight >= scrollHeight) {

        endOfThePage += 1;
        console.log(`
                Srolled to the end of page: $ { endOfThePage }
                `);

        getData();
    }


}
window.addEventListener('scroll', scrollToEndOfPage);