---
title: Music
subtitle: A POC music collection.
layout: layouts/base.njk
---


## All the music of Astraalivankila

   <ul class="listing">
         {%- for page in collections.media -%}
          <a href="{{ page.url }}"><div class=" aligner aligner--spaceBetween aligner--centerVertica rounded-corners mb-medium border">
          <time class="badge badge--dark  m-none"  datetime="{{ page.date }}">{{ page.date | dateDisplay }}</time>
          <div class="flex-grow bg-gray-light  p-medium text-right"><span class="text-medium text-secondary"><strong>{{ page.data.title }}</strong></span></div>
          </div></a>
          {%- endfor -%}
       </ul>



