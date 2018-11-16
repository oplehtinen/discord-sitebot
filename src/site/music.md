---
title: Music
subtitle: A POC music collection.
layout: layouts/base.njk
---


## All the music of Astraalivankila

   <ul class="listing">
         {%- for page in collections.media -%}
          <li>
          <a href="{{ page.url }}">{{ page.data.title }}</a> -
          <time datetime="{{ page.date }}">{{ page.date | dateDisplay }}</time>
          </li>
          {%- endfor -%}
       </ul>



