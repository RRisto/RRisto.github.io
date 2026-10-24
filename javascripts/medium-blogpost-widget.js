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
        if (!/^[a-zA-Z0-9_-]{1,50}$/.test(username)) {
            throw new Error('Invalid Medium username')
        }
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(`https://medium.com/feed/@${username}`)}`)
        if (!response.ok) throw new Error('Unable to load Medium feed')
        const data = await response.json()
        if (data.status !== 'ok' || !data.feed || !Array.isArray(data.items)) {
            throw new Error('Invalid Medium feed response')
        }
        return data
    }
    connectedCallback(){
        this.username = this.getAttribute("username")
        this.render()
    }
    renderUser(data){
        const imageUrl = this.safeHttpsUrl(data.feed.image)
        if (imageUrl) {
            const image = document.createElement('img')
            image.src = imageUrl
            image.alt = 'Medium author'
            this._shadowRoot.querySelector('.medium-blogpost-author-img').replaceChildren(image)
        }

        const info = this._shadowRoot.querySelector('.medium-blogpost-author-info')
        const name = document.createElement('h3')
        name.textContent = data.items[0]?.author || this.username
        const username = document.createElement('p')
        username.textContent = `@${this.username}`
        const follow = document.createElement('a')
        follow.href = `https://medium.com/@${encodeURIComponent(this.username)}`
        follow.target = '_blank'
        follow.rel = 'noopener noreferrer'
        const button = document.createElement('button')
        button.className = 'medium-follow-button'
        button.textContent = 'Follow'
        follow.append(button)
        info.replaceChildren(name, username, follow)
    }

    renderArticles(data=[]){
        const articles = data.slice(0, 10).map(article => {
            const linkUrl = this.safeHttpsUrl(article.link)
            if (!linkUrl) return null

            const link = document.createElement('a')
            link.className = 'medium-blogpost-single-article'
            link.href = linkUrl
            link.target = '_blank'
            link.rel = 'noopener noreferrer'
            const title = document.createElement('h3')
            title.textContent = article.title || 'Untitled article'
            const date = document.createElement('p')
            date.textContent = this.parseDate(article.pubDate)
            link.append(title, date)
            return link
        })
        this._shadowRoot.querySelector('.medium-blogpost-articles').replaceChildren(...articles.filter(Boolean))
    }

    safeHttpsUrl(value) {
        try {
            const url = new URL(value)
            return url.protocol === 'https:' ? url.href : null
        } catch {
            return null
        }
    }
    parseDate(date) {
        const IsoStringToDate = new Date(date);
        const parsedDate = IsoStringToDate.toUTCString().slice(5).slice(0, -13);
        return parsedDate;
      };

    async render(){
        try {
            const data = await this.fetchPosts(this.username)
            this.renderUser(data)
            this.renderArticles(data.items)
        } catch (error) {
            const message = document.createElement('p')
            message.textContent = 'Articles are temporarily unavailable.'
            this._shadowRoot.querySelector('.medium-blogpost-articles').replaceChildren(message)
            console.error('Unable to render Medium posts:', error)
        }
    }
}

customElements.define('medium-blogpost', MediumBlogpost)
