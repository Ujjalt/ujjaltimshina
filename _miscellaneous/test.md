---
layout: archive
title: "Miscellaneous"
permalink: /miscellaneous/
author_profile: true
---

{% include base_path %}

<p>
  You can visit my external gallery at the link below:
</p>

<a href="https://sites.google.com/iiitd.ac.in/ujjal-timshina/gallary" target="_blank" style="display: inline-block; background-color: #0366d6; color: white; padding: 10px 16px; border-radius: 6px; text-decoration: none;">
  View Gallery
</a>

<hr>

{% for post in site.miscellaneous %}
  {% include archive-single.html %}
{% endfor %}
