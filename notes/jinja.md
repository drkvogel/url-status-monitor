
# jinja

render html with `|safe`, e.g.: `<p>message: {{ msg|safe }}</p>`

```html
<!-- Child Template -->
{% extends "base.html" %}
{% block title %} Child Template {% endblock %}
{% block head %}
 <!-- { {  super() } } -->
<!-- some stuff in head -->
{% endblock %}
{% block body %}
 <h1>Hello World</h1>
 <p>Welcome to my site.</p>
{% endblock %}
```