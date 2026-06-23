from flask import Flask, render_template, request, jsonify
import os
from werkzeug.utils import secure_filename
#tranfoma o dicionario py para jdson
from flask_sqlalchemy import SQLAlchemy
#from app import db
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
from urllib.parse import quote_plus


app = Flask(__name__, template_folder='Gaion/Conta/cadastro', static_folder='Gaion/Conta/cadastro', static_url_path='/')

app.config['JSON_SORT_KEYS']=False
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///cadastro.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Configurar pasta para salvar as imagens dos terrenos
UPLOAD_FOLDER = os.path.join(app.root_path, 'Gaion', 'imagens', 'uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

db = SQLAlchemy(app)

# Permitir requisições de outras portas (CORS)
@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type,Authorization'
    response.headers['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE,OPTIONS'
    return response

class cliente(db.Model):
    __tablename__ = 'clientes'
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(60),nullable=False)
    email = db.Column(db.String(60), unique=True, nullable=False)
    cpf = db.Column(db.String(11), unique=True, nullable=True)
    nascimento = db.Column(db.Date, nullable=False)
    senha_hash = db.Column(db.String(255), nullable=True) #nullable=True, temporariamente
    is_vendedor = db.Column(db.Boolean, default=False)
    id_empresa = db.Column(db.String(50), nullable=True)

    def definir(self, senha_monstro):
        self.senha_hash = generate_password_hash(senha_monstro)

    def verificar(self, senha_pura):
        return check_password_hash(self.senha_hash, senha_pura)
    
class Terreno(db.Model):
    __tablename__ = 'terrenos'
    id = db.Column(db.Integer, primary_key=True)
    preco = db.Column(db.String(50))
    tipo = db.Column(db.String(50))
    endereco = db.Column(db.String(255))
    bairro = db.Column(db.String(100))
    cidade = db.Column(db.String(100))
    referencia = db.Column(db.String(255))
    frente = db.Column(db.String(50))
    fundo = db.Column(db.String(50))
    area = db.Column(db.String(50))
    topografia = db.Column(db.String(50))
    testada = db.Column(db.String(50))
    observacoes = db.Column(db.Text)
    vendedor = db.Column(db.String(100))
    contato = db.Column(db.String(50))
    imagens = db.Column(db.Text)

@app.route('/', methods=['GET', 'POST'])
@app.route("/cadastrar-se", methods=['GET', 'POST'])
@app.route("/cadastro", methods=['GET', 'POST'])
def inicializar():
    nome_cadastrado = None

    # SÓ tenta ler os dados se o usuário clicou no botão "Criar" (POST)
    if request.method == 'POST':
        nome_cadastrado = request.form.get('nome')
        email = request.form.get('email')
        senha = request.form.get('senha')
        cpf = request.form.get('cpf')

        if cpf:
            cpf = "".join(filter(str.isdigit, cpf))
            if cpf == "":
                cpf = None
        else:
            cpf = None
            
        id_empresa = request.form.get('id')
        
        # Define se é vendedor baseado no preenchimento do CPF ou ID da empresa
        is_vendedor = False
        if cpf or id_empresa:
            is_vendedor = True
        
        # Se quiser capturar o nascimento que está no seu HTML:
        dia = request.form.get('dia')
        mes = request.form.get('mes')
        ano = request.form.get('ano')

        try:
            data_string = f"{ano}-{mes}-{dia}"
            data_formatada= datetime.strptime(data_string, "%Y-%m-%d").date()
        except ValueError:
            return "Erro: data de nascimento inválida", 400
        
        try:
            novo_cliente = cliente(
                nome=nome_cadastrado,
                email=email,
                cpf=cpf,
                nascimento =data_formatada,
                is_vendedor = is_vendedor,
                id_empresa = id_empresa
            )
            novo_cliente.definir(senha)
            db.session.add(novo_cliente)
            db.session.commit()

            print(f"Usúario {nome_cadastrado} salvo com sucesso no SQLite!")


        except Exception as e:
            db.session.rollback()
            print(f"Erro ao salvar no banco: {e}")
            return "Erro ao salvar no banco de dados", 500
        
        # Mostra no terminal do VS Code / Prompt
        #print(f'Resultado nome : {nome_cadastrado}')
        #print(f'Resultado email: {email}')
        #print(f'Resultado senha: {senha}')
        #print(f'Data de Nascimento: {dia}/{mes}/{ano}')

    # Passamos a variável 'nome' para o HTML exibir a mensagem no final, se ela existir
    return render_template('cadastro.html', nome=nome_cadastrado)

@app.route('/api/terrenos', methods=['POST'])
def receber_terreno():
    # Usamos request.form porque a página agora envia FormData (texto + imagens)
    if not request.form:
        return jsonify({"erro": "Nenhum dado recebido"}), 400
    
    # Informações principais
    preco = request.form.get('price')
    tipo = request.form.get('terrainType')
    endereco = request.form.get('address')
    area = request.form.get('area')
    vendedor = request.form.get('seller')

    # Informações adicionais
    bairro = request.form.get('neighborhood')
    cidade = request.form.get('city')
    referencia = request.form.get('reference')
    frente = request.form.get('front')
    fundo = request.form.get('depth')
    topografia = request.form.get('topography')
    testada = request.form.get('frontage')
    obs = request.form.get('observations')
    contato = request.form.get('contact')

    # Imagens
    imagens = request.files.getlist('images')
    nomes_salvos = []
    for img in imagens:
        if img.filename:
            filename = secure_filename(img.filename)
            caminho_completo = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            img.save(caminho_completo)
            nomes_salvos.append(filename)
    
    imagens_str = ", ".join(nomes_salvos)
    
    # Salvar no banco
    try:
        novo_terreno = Terreno(
            preco=preco,
            tipo=tipo,
            endereco=endereco,
            bairro=bairro,
            cidade=cidade,
            referencia=referencia,
            frente=frente,
            fundo=fundo,
            area=area,
            topografia=topografia,
            testada=testada,
            observacoes=obs,
            vendedor=vendedor,
            contato=contato,
            imagens=imagens_str
        )
        db.session.add(novo_terreno)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        print(f"Erro ao salvar terreno no banco: {e}")
        return jsonify({"erro": "Erro ao salvar no banco de dados"}), 500
    
    # Fazendo algo com a informação (ex: printando no terminal)
    print("\n--- Novo Terreno Recebido e Salvo no Banco ---")
    print(f"Tipo: {tipo} | Preço: {preco}")
    print(f"Endereço: {endereco}, {bairro}, {cidade} - Ref: {referencia}")
    print(f"Dimensões: Frente {frente}m x Fundo {fundo}m | Área: {area} m²")
    print(f"Topografia: {topografia} | Testada: {testada}m")
    print(f"Observações: {obs}")
    print(f"Vendedor: {vendedor} | Contato: {contato}")
    print(f"Imagens salvas ({len(nomes_salvos)}): {imagens_str if imagens_str else 'Nenhuma'}")
    print("----------------------------------------------\n")
    
    return jsonify({"mensagem": "Terreno processado com sucesso!", "id": novo_terreno.id}), 200

@app.route('/api/terrenos', methods=['GET'])
def listar_terrenos():
    terrenos = Terreno.query.all() if hasattr(Terreno, 'query') else db.session.query(Terreno).all()
    resultado = []
    for t in terrenos:
        imagem_url = "/Gaion/imagens/placeholder.png"
        if t.imagens:
            primeira_img = t.imagens.split(", ")[0]
            if primeira_img.startswith("../../imagens/"):
                imagem_url = primeira_img.replace("../../imagens/", "/Gaion/imagens/")
            elif primeira_img.startswith("http"):
                imagem_url = primeira_img
            else:
                imagem_url = f"/Gaion/imagens/uploads/{primeira_img}"

        resultado.append({
            "id": t.id,
            "preco": t.preco,
            "tipo": t.tipo,
            "endereco": t.endereco,
            "bairro": t.bairro,
            "cidade": t.cidade,
            "referencia": t.referencia,
            "largura": t.frente,
            "comprimento": t.fundo,
            "area": t.area,
            "topografia": t.topografia,
            "testada": t.testada,
            "observacoes": t.observacoes,
            "vendedor": t.vendedor,
            "contato": t.contato,
            "imagem": imagem_url
        })
    return jsonify(resultado), 200

@app.route('/api/terrenos/<int:id>', methods=['GET'])
def get_terreno(id):
    t = db.session.get(Terreno, id) if hasattr(db.session, 'get') else Terreno.query.get(id)
    if not t:
        return jsonify({"erro": "Terreno não encontrado"}), 404
        
    imagem_url = "/Gaion/imagens/placeholder.png"
    if t.imagens:
        primeira_img = t.imagens.split(", ")[0]
        if primeira_img.startswith("../../imagens/"):
            imagem_url = primeira_img.replace("../../imagens/", "/Gaion/imagens/")
        elif primeira_img.startswith("http"):
            imagem_url = primeira_img
        else:
            imagem_url = f"/Gaion/imagens/uploads/{primeira_img}"

    return jsonify({
        "id": t.id,
        "preco": t.preco,
        "tipo": t.tipo,
        "endereco": t.endereco,
        "bairro": t.bairro,
        "cidade": t.cidade,
        "referencia": t.referencia,
        "largura": t.frente,
        "comprimento": t.fundo,
        "area": t.area,
        "topografia": t.topografia,
        "testada": t.testada,
        "observacoes": t.observacoes,
        "vendedor": t.vendedor,
        "contato": t.contato,
        "imagem": imagem_url
    }), 200

if __name__ == '__main__':
    with app.app_context():
        db.create_all()

    app.run(host="localhost", port=5000, debug=True)
