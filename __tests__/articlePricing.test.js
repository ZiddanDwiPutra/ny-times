/**
 * @jest-environment jsdom
 */

import Balance from "../src/balance"
import StorageManager from "../src/storageManager"
import ArticlePricing from "../src/articlePricing"
const {localStorage} = window
const balance = new Balance()

function createArticleTest(id, prevDate = 0){
    let date = new Date()
    date.setDate(date.getDate()-prevDate)
    return {
        id,
        published_date: date.toDateString()
    }
}

test("set pricing if article created today (50.000 coins)", ()=>{
    const article = createArticleTest("test1", 0)
    expect(new ArticlePricing(article).priceNum).toBe(50000)
})

test("set pricing if article created 6 days ago (20.000 coins)", ()=>{
    const article = createArticleTest("test6", 6)
    expect(new ArticlePricing(article).priceNum).toBe(20000)
})

test("set pricing if article created 7 days ago (20.000 coins)", ()=>{
    const article = createArticleTest("test7", 7)
    expect(new ArticlePricing(article).priceNum).toBe(20000)
})

test("set pricing if article created more than 7 days ago (Free)", ()=>{
    let article = createArticleTest("test8", 8)
    expect(new ArticlePricing(article).priceNum).toBe(0)

    article = createArticleTest("test9", 9)
    expect(new ArticlePricing(article).priceNum).toBe(0)

    article = createArticleTest("test14", 14)
    expect(new ArticlePricing(article).priceNum).toBe(0)
})