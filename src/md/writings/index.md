# Writings
{% for writing in writings %}
# [{{writing.title}}]({{writing.title | simplify}}.md)
{{ writing.md.split("\n\n")[0].split("\n").slice(1).join("\n") }}
{% endfor %}
