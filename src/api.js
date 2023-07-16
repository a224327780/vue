export const format = (str) => {
    let pattern = /```(.+?)```/gms;
    let match;
    let language = /```(\w+)/.exec(str)
    if (language) {
        language = language[1]
    }
    while ((match = pattern.exec(str)) !== null) {
        let regex = new RegExp(`${language}\\s`, 'gs');
        let code = match[1].replace(regex, '')
        let html = `<pre><code class="language-${language}">${code}</code></pre>`
        str = str.replace(match[0], html)
    }

    str = str.replace(/(\n\n)/g, "<br>");
    return `${str}`
}