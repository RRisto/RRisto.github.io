const template = document.createElement('template')

template.innerHTML = `
<style>
.medium-blogpost {
  display: flex;
  gap: 56px;
}
.medium-blogpost-author {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.medium-blogpost-author-img img {
  border-radius: 2px;
  display: block;
}
.medium-blogpost-author-info h3 {
  font-size: var(--headings-heading-4-font-size);
  font-style: var(--headings-heading-4-font-style);
  font-weight: var(--headings-heading-4-font-weight);
  line-height: var(--headings-heading-4-line-height);
  color: var(--headings-heading-4-color);
  margin: 0;
}
.medium-blogpost-author-info p {
  margin: 6px 0 0;
}
.medium-follow-button {
  padding: var(--button-padding);
    color: var(--button-color);
    font-size: var(--button-font-size);
    font-style: var(--button-font-style);
    font-weight: var(--button-font-weight);
    -webkit-text-decoration: var(--button-text-decoration);
    text-decoration: var(--button-text-decoration);
    text-transform: var(--button-text-transform);
    background-color: var(--button-background-color);
    border-radius: var(--button-border-radius);
    border: var(--button-border-size) solid;
    border-color: var(--button-border-color);
    cursor: pointer;
    transition: all .3s cubic-bezier(.1,.6,0,1);
    margin-top: 16px;
}
.medium-follow-button:hover {
  background-color: var(--button-hover-background-color);
  border-color: var(--button-hover-border-color);
}
.medium-blogpost-articles {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
}
a.medium-blogpost-single-article {
  display: flex;
  flex-direction: column-reverse;
  gap: 6px;
  background: none !important;
  color: var(--content-link-color);
  text-decoration: none;
}
a.medium-blogpost-single-article:hover {
  color: var(--content-link-hover-color);
}
.medium-blogpost-single-article h3 {
  font-size: var(--headings-heading-4-font-size);
  font-style: var(--headings-heading-4-font-style);
  font-weight: var(--headings-heading-4-font-weight);
  line-height: var(--headings-heading-4-line-height);
  color: var(--headings-heading-4-color);
  margin: 0;
}
.medium-blogpost-single-article p {
  margin: 0;
  white-space: nowrap;
}
@media screen and (max-width: 900px) {
  .medium-blogpost {
    gap: 42px;
  }   
}
@media screen and (max-width: 600px) {
  .medium-blogpost {
    flex-direction: column;
  }
  .medium-blogpost-author {
    flex-direction: row;
    gap: 32px;
    align-items: center;
  }
}
</style>
<div class="medium-blogpost">
    <div class="medium-blogpost-author">
      <div class="medium-blogpost-author-img"></div>
      <div class="medium-blogpost-author-info"></div>
    </div>
    <div class="medium-blogpost-articles"></div>
</div>

`
class MediumBlogpost extends HTMLElement {
    constructor() {
        super()
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true)); 
    }
    async fetchPosts(username) {
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${username}`)
        const data = await response.json()
        return data
    }
    connectedCallback(){
        this.username = this.getAttribute("username")
        this.render()
    }
    renderUser(data){
        this._shadowRoot.querySelector('.medium-blogpost-author-img').innerHTML = `<img src="${data.feed.image}" alt="${this.name}"/>`
        this._shadowRoot.querySelector('.medium-blogpost-author-info').innerHTML = `<h3>${data.items[0].author}</h3><p>@${this.username}</p><a href="https://medium.com/@${this.username}" target="_blank"><button class="medium-follow-button">Follow</button></a>`
    }

    renderArticles(data=[]){
        data.forEach(data =>{
            this._shadowRoot.querySelector('.medium-blogpost-articles').innerHTML +=`<a style="background: linear-gradient(to bottom,rgba(37, 37, 37, 0.349), rgba(27, 27, 27, 0.678)), url('${data.thumbnail}');background-size: contain;"class="medium-blogpost-single-article" href="${data.link}" target="_blank"><h3>${data.title}</h3><p>${this.parseDate(data.pubDate)}</p></a>`
        })
    }
    parseDate(date) {
        const IsoStringToDate = new Date(date);
        const parsedDate = IsoStringToDate.toUTCString().slice(5).slice(0, -13);
        return parsedDate;
      };

    async render(){
        const data =  await this.fetchPosts(this.username)
        this.renderUser(data)
        this.renderArticles(data.items)
    }
}

customElements.define('medium-blogpost', MediumBlogpost)