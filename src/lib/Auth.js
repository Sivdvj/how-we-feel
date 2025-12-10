export async function request(path, data = {}){
    let Sid = localStorage.getItem('Sid') || ""
    data.Sid = Sid
    let res = await fetch(`http://localhost:3000${path}`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    })

    let response = await res.json();

    if(!res.ok){
        if(response.error !== 'Authentication'){
            return {error: response.error}
        }
        localStorage.clear()
        window.location.reload()
        return {error: response.error}
    }

    return response
}

