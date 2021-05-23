const request = require('request');
const cheerio = require('cheerio');
const wait=ms=>new Promise(resolve => setTimeout(resolve, ms));

proceed = true;
index  = 407;
page = 1;

// Prints all review dates of a product iteratively.
// Link - initial link (Without the imdex to the page from which we want to scrape the reviews)
function printReviewDates(link) {
    link1 = link + '' +index;
    request(link1, (error,
        response,html) => {
            if(!error && response.statusCode == 200) {
                const $ = cheerio.load(html);
                const reviews = $('.review');
                reviews.each((i, review) => {
                // Find the text children
                const textReview = $(review).find('.review-date').text();
                console.log(index+":"+textReview);
                });

                index++;
                wait(30*1000).then(() => printReviewDates(link));

            }
        }
    );
}

function getAllRatings_GoToNextPage_Iterate(link) {
    request(link, (error,
        response,html) => {
            if(!error && response.statusCode == 200) {
                // Print all search data ->
                const $ = cheerio.load(html);
                const searches = $(".s-result-item");
                searches.each((i, item) => {
                // Find the text children
                textReview = $(item).find('.a-row.a-size-small').text().replace(/\n/g,"");
                //textReview.replace("Microsoft", "W3Schools");
                href = $(item).find('h2.a-size-mini.a-spacing-none.a-color-base').find('a.a-link-normal.a-text-normal').attr("href");
                itemName = $(item).find('span.a-size-base-plus.a-color-base.a-text-normal').text();
                //itemName = $(item).find('span.a-size-medium.a-color-base.a-text-normal').text();
                if(href!="" && itemName!="" && textReview.includes('stars'))
                    console.log(page+" # "+itemName+" # "+href+" # "+textReview);
                });

                // Get next page link.
                const nextPageTag = $('ul.a-pagination');
                nextpageref = $(nextPageTag).find('li.a-last').find('a').attr("href");
                nextpageref = "https://www.amazon.in"+nextpageref;

                // DO it again!!
                page++;
                wait(4*1000).then(() => getAllRatings_GoToNextPage_Iterate(nextpageref));
            }
        }
    );
}


// Get all product ratings from the current page.
function getAllRatings(link) {
    request(link, (error,
        response,html) => {
            if(!error && response.statusCode == 200) {
                const $ = cheerio.load(html);
                const searches = $(".s-result-item");// s-asin sg-col sg-col-12-of-12 sg-col-12-of-16 sg-col-16-of-20", ".s-result-item s-asin sg-col-0-of-12 sg-col-16-of-20 sg-col sg-col-12-of-16");
                searches.each((i, item) => {
                // Find the text children
                //if($(item).)
                textReview = $(item).find('.a-row.a-size-small').text().replace(/\n/g,"");
                //textReview.replace("Microsoft", "W3Schools");
                href = $(item).find('h2.a-size-mini.a-spacing-none.a-color-base').find('a.a-link-normal.a-text-normal').attr("href");
                itemName = $(item).find('span.a-size-medium.a-color-base.a-text-normal').text();
                if(textReview && textReview.includes('stars'))
                    console.log(itemName+" : "+href+" : "+textReview);
                });
            }
        }
    );
}

//link = 'https://www.amazon.in/Samsung-Fully-Automatic-WA65A4002VS-TL-Technology/product-reviews/B08GY3PZQF/ref=cm_cr_getr_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber='
//printReviewDates(link);

link = 'https://www.amazon.in/s?k=mens+trimmer&crid=18JSUM5K9RRFS&qid=1621790145&sprefix=mens+%2Caps%2C341&ref=sr_pg_1';
getAllRatings_GoToNextPage_Iterate(link);
//getAllRatings(link);
