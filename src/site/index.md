---
title: EleventyOne
subtitle: A project scaffold for getting building with Eleventy quickly.
layout: layouts/base.njk
---


## This site is a starting point

From this point we should already have:

- [Eleventy](https://11ty.io) with a skeleton site
- A date format filter for Nunjucks
- Sass pipeline
- JS pipeline
- JS [search index](/search.json) generator
- Serverless (FaaS) development pipeline with Netlify Functions for Lambda


## Post pages

The pages found in in the posts

   <ul class="listing">
         {%- for page in collections.post | reverse -%}
          <a href="{{ page.url }}"><div class=" aligner aligner--spaceBetween aligner--centerVertica rounded-corners mb-medium border">
          <time class="badge badge--dark  m-none"  datetime="{{ page.date }}">{{ page.date | dateDisplay }}</time>
          <div class="flex-grow bg-gray-light  p-medium text-right"><span class="text-medium text-secondary"><strong>{{ page.data.title }}</strong></span></div>
          </div></a>
          {%- endfor -%}
       </ul>



