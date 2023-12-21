# Projects
{% for title in titles %}
{{ projects[title].md.replace("#", "##") | safe }}

Technologies: {{ projects[title].tags.join(", ") }}
{% endfor %}
