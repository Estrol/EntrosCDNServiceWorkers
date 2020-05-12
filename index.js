const domain = ["cdn.entrosbot.xyz", "round-bonus-3934.estrolmendex.workers.dev"];

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

/**
 * Respond to the request
 * @param {Request} request
 */
async function handleRequest(request) {
    if (request.method !== "GET") {
        return new Response('{"error": 403, "message":"Invalid method, use GET instead"}', {
            headers: {
                "Content-Type": "application/json"
            },
            status: 403
        })
    }

    const url = new URL(request.url);
    if (domain.includes(url.hostname)) {
        try {
            const pathName = url.pathname;
            if (pathName === "/") {
                return new Response("Entros Content Delivery Network version 1.0.0\n\nThis subdomain mainly for Quick Discord Image sharing\nIn order to register account here please send email to sharex@entrosbot.xyz or DM me at Discord Estrol#0021 <523854355955449896>\n\nList URI Path\n/~<user>/<file-name>\n/~<user>/upload\n\nUpload Headers => Authorization: 'Private-Key-<Random-byte-key-here>'", {
                    status: 200
                })
            }
            if (!/\/(~estrol)/.test(pathName)) {
                return new Response(`{"error": 404, "message":"User not found"}`, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    status: 404
                });
            }
            const urlArgument = pathName.replace(/\/(~estrol)/, "");
            if (urlArgument.length < 1) {
                return new Response(`{"error": 400, "message":"Invalid request data"}`, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    status: 400
                });
            }
            if (urlArgument === "/") {
                return new Response(`{"error": 400, "message":"Invalid request data"}`, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    status: 400
                });
            }
            if (urlArgument === "/upload") {
                if (!request.headers.get("Authorization")) {
                    return new Response(`{"error": 403, "message":"Authorization headers is required"}`, {
                        headers: {
                            "Content-Type": "application/json"
                        },
                        status: 403
                    });
                }
    
                return new Response(`{"error": 403, "message":"Invalid Authorization data."}`, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    status: 403
                });
            }
    
            const requestURI = new URL(`https://f000.backblazeb2.com/file/estrol-uploads` + urlArgument);
            const result = await fetch(requestURI)
            const resultCloned = result.clone();
            try {
                const jsonResult = await resultCloned.json();
                if (jsonResult.code === "not_found") {
                    return new Response(`{"error": 404, "message":"File not found"}`, {
                        headers: {
                            "Content-Type": "application/json"
                        },
                        status: 404
                    });
                }
            } catch (error) {};
    
            return new Response(result.body, {
                status: 200
            })
        } catch (error) {
            return new Response(error, {
                status: 500
            })
        }
    }

    const headerResult = await fetch(request.url);

    return new Response(headerResult.body, {
        status: 200
    });
}
