---
layout: layouts/base.njk
pageClass: posts
templateEngineOverride: njk, md
---

<p class="date tag text-uppercase ">
  <time datetime="{{ date }}">{{ date | dateDisplay }}</time>
</p>
<main>
  {{ content | safe }}
  <div class="footnote">
    <p class="text-gray">
      This is a work in progress.
    </p>
  </div>
  <ul class="listing">
      {%- for page in collections.post -%}
      <li>
      <a href="{{ page.url }}">{{ page.data.title }}</a> -
      <time datetime="{{ page.date }}">{{ page.date | dateDisplay }}</time>
      </li>
      {%- endfor -%}
      </ul>
</main>
