const { createClient } = supabase;
const supabaseClient = createClient(
  window.SUPABASE_URL || "YOUR_SUPABASE_URL",
  window.SUPABASE_ANON_KEY || "YOUR_SUPABASE_ANON_KEY"
);

async function signIn(){
  const { data, error } = await supabaseClient.auth.signInWithOAuth({ provider: 'google' });
  if(error) console.error(error);
}

supabaseClient.auth.onAuthStateChange((event, session) => {
  if(session){
    document.getElementById('auth').style.display = 'none';
    document.getElementById('app').style.display = 'block';
  } else {
    document.getElementById('auth').style.display = 'block';
    document.getElementById('app').style.display = 'none';
  }
});

async function logout(){
  await supabaseClient.auth.signOut();
}

async function publicar(){
  const titulo = document.getElementById('titulo').value;
  const user = (await supabaseClient.auth.getUser()).data.user;
  let { data, error } = await supabaseClient.from('listings').insert([{
    owner: user.id,
    titulo: titulo,
    descripcion: "demo",
    tipo: "venta",
    categoria: "casa",
    precio_raw: 1000000,
    ciudad: "CDMX",
    colonia: "Roma"
  }]);
  if(error) console.error(error);
  else alert("Publicado!");
}

async function buyPlan(priceId, listingId){
  const user = (await supabaseClient.auth.getUser()).data.user;
  const resp = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: { 'Content-Type':'application/json' },
    body: JSON.stringify({
      priceId,
      userId: user.id,
      listingId,
      successUrl: window.location.origin + "?success=1",
      cancelUrl: window.location.origin + "?cancel=1"
    })
  });
  const { url } = await resp.json();
  window.location = url;
}
