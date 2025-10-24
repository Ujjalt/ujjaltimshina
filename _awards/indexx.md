---
layout: archive
title: "Awards"
permalink: /awards/
author_profile: true
---

{% include base_path %}

<h2>Major Fellowships and Awards</h2>

{% for post in site.awards %}
  {% include archive-single.html %}
{% endfor %}
