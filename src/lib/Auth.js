export async function request(path, data = {}){
    let Sid = localStorage.getItem('Sid') || ""
    data.Sid = Sid
    let res = await fetch(`http://localhost:3000${path}`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    })
    if(!res.ok){
        localStorage.clear()
        window.location.reload()
        return {}
    }

    return await res.json()
}

