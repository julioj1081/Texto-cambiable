class TextoCambiable{
    constructor(e){
        this.e = e
        this.caracteres = '!<>-_\\/[]{}—=+*^?#________'
        this.Actualizar = this.Actualizar.bind(this)
    }

    //agrega texto
    setTexto(NuevoTexto){
        const viejoTexto = this.e.innerText
        const length = Math.max(viejoTexto.length, NuevoTexto.length)
        const promise = new Promise((resolve) => this.resolve = resolve)
      this.queue = [] //arrego de caracteres entrantes y salida
        for(let i = 0; i< length; i++){
            const from = viejoTexto[i] || ''
            const to = NuevoTexto[i] || ''
            const Inicio = Math.floor(Math.random() * 40) // 40 dice la documentacion ☜(ﾟヮﾟ☜)
            const Fin = Inicio + Math.floor(Math.random() * 40)
            this.queue.push({from, to, Inicio, Fin});
        }

        //cancelAnimationFrame(this.frameRequest)
        this.frame = 0;
        this.Actualizar();
        return promise;
    }
    Actualizar(){
        let salida = '';
        let completo = 0;
        for(let i = 0, n = this.queue.length; i < n; i++){
            let {from, to, Inicio, Fin, char} = this.queue[i];
            if(this.frame >= Fin){
                completo++;
                salida += to;
            }else if(this.frame >= Inicio){
                if(!char || Math.random() < 0.28){
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                salida += `<span class="dud">${char}</span>`;
            }else{
                salida += from;
            }
        }
        this.e.innerHTML = salida;
        if(completo === this.queue.length){
            this.resolve();
        }else{
            this.frameRequest = requestAnimationFrame(this.Actualizar);
            this.frame++;
        }
    }
    randomChar(){
        return this.caracteres[Math.floor(Math.random() * this.caracteres.length)];
    }
}

const Semana = [
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
    'Sabado',
    'Domingo',
    "Julio Alberto Fernandez Gonzalez"
]

const e = document.querySelector('.text');
const fx = new TextoCambiable(e);
let cont = 0;
const next = () => {
    fx.setTexto(Semana[cont]).then(() => {
        setTimeout(next, 1800)
    })
    cont = (cont + 1) % Semana.length;
}

next();