---
layout: archive
title: "Gallery"
permalink: /gallery/
author_profile: true
redirect_from:
  - /gallery.html
---

Welcome to my gallery — a curated collection of visuals from my academic journey, outreach events, lectures, and explorations in mathematical beauty. Each image tells a story — of ideas shared, connections formed, or moments captured.

> *Mathematics is not just about symbols and logic — it's also visual, intuitive, and sometimes, surprisingly artistic.*

---

{% include base_path %}

{% assign images = site.static_files | where_exp: "item", "item.path contains '/images/gallery/'" %}
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
  {% for image in images %}
    <div class="rounded overflow-hidden shadow-lg">
      <img src="{{ image.path | relative_url }}" alt="{{ image.name }}" class="w-full object-cover">
    </div>
  {% endfor %}
</div>
