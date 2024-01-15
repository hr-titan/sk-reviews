<a id='readme-top'></a>
# Titan - Atelier API

<img src='https://github.com/hr-titan/sk-reviews/blob/main/image/k6.png' width='40%' />
<img src='https://github.com/hr-titan/sk-reviews/blob/main/image/nginx.png' width='40%' />

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href='#about'>About</a>
      <ul>
        <li>
          <a href='#built-with'>Built With</a>
        </li>
        <li>
          <a href='#project-overview'>Project Overview</a>
        </li>
      </ul>
    </li>
    <li>
      <a href='#performance-results'>Performance Results</a>
    </li>
    <li>
      <a href='#rtl'>RTL Learnings</a>
    </li>
     <li>
      <a href='#takeaways'>Takeaways</a>
    </li>
  </ol>
</details>

# ❓ About
<a id='about'></a>
Server side for Atelier, an e-commerce platform, which you can find <a href='https://github.com/Revenge-of-the-SithQL/atelier' target='_blank'>here</a>

## Built With
<a id='built-with'></a>

![node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![Mongodb](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

## Project Overview
<a id='project-overview'></a>

### Situation

Redesign and develop a Node.js RESTful API, serving product rating & reviews data.

### Task

Optimize and scale the API to handle production level traffic with low latency and <1% error rates.

### Action

Horizontally scale using NGINX, using the least connection method to load-balance.
Implemented a LRU cache the server and refactored database queries to utilize
MongoDB's indexes. Redesigned the data schema and created a background service to
reduce calculations per request, for product meta data, which was done using an
algorithm created using MongoDB's aggregation pipeline. System bottlenecks
observed and resolved with load testing using K6, Artillery, and Loader.io.

### Result

Achieved an average response time of 200 ms with near 0% error rate when ramping VU from 1 to 1000 RPS.


<img src='https://github.com/hr-titan/sk-reviews/blob/main/image/least_conn.png' />

<p align="right"><a href="#readme-top">back to top</a></p>

# 📈 Performnace Results
<a id='performance-results'></a>

### Target
- [ ] Throughput: 100 RPS
- [ ] Latency: 2000ms
- [ ] Error Rate: <1% rate

### Actual
- [x] Throughput: 2000 RPS
- [x] Latency: ~200ms
- [x] Error Rate: near 0% rate

<p align="right"><a href="#readme-top">back to top</a></p>

# ⚙️ RTL Learnings/Findings
<a id='rtl'></a>
One of the biggest struggles for this project was the RTL process. I was given around 5gbs of ratings & review data in the form of CSV files. This introduced a couple of challenges. For one, my database was mongodb, CSV data is not native to mongodb nor does it transpile very well using mongo's pipeline. This in combination with my idea of redesigning the data schema, proved to be difficult. My new schema design pre-calculated meta data per product and stored that data in a new collection. To do this, I essentially had to convert millions of lines of CSV data into json files, which was done using Node's read/write streams. Then import the json files into mongodb and run an aggregation script to calculate the data. After a lot of waiting/debugging/optimizing/crying i was able to get the script to run at an average of 3 minutes. This significantly cut query times - from 2s averages to 50ms in a local environment.


# Takeaways
<a id='takeaways'></a>
Some key takeaways from this project -
- Most databases can index data, significantly reducing look-up times. They use an algorithm which is/similar to a b-tree. Essentially reducing look-ups to O(log<sub>n</sub>).
- When horizontally scaling, there is a level of diminishing returns. More !== better. Each added server increased efficiency slightly less than the predecing server.
- Caching is magical, but also a challenge to determine where/what you cache. LRU cache is very useful when there is a trend, but less valuable when the requested data is sporatic.

<p align="right"><a href="#readme-top">back to top</a></p>
