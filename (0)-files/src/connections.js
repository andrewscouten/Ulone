class ConnectionGraph {

    static create_branch_nodes(branch, content) {
        let sub_nodes = (c, idx) => `${branch}${idx + 1}[${c}]:::internal-link\n${branch} --> ${branch}${idx + 1}\n`
        return content.map(sub_nodes).join('')
    }

    static create_branch(branch, content) {
        var text = ""
        if (content.length > 0) {
            text = `
                ${branch}[${branch}]
                Current --> ${branch}
                ${ConnectionGraph.create_branch_nodes(branch, content)}
            `
        }
        return text
    }

    static create_graph(dv) {
        let graph = `\`\`\`mermaid
            flowchart LR
            Current(${dv.current().file.name})
            ${ConnectionGraph.create_branch("Parents", dv.current().parents ?? [])}
            ${ConnectionGraph.create_branch("Siblings", dv.current().siblings ?? [])}
            ${ConnectionGraph.create_branch("Children", dv.current().children ?? [])}
            ${ConnectionGraph.create_branch("Partners", dv.current().partners ?? [])}
            ${ConnectionGraph.create_branch("Allies", dv.current().allies ?? [])}
            ${ConnectionGraph.create_branch("Enemies", dv.current().enemies ?? [])}
            classDef default normal;
        `
        return graph
    }
}

module.exports = ConnectionGraph