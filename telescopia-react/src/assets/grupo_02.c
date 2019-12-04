#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <conio.h>

/*
 Rogerio Pereira Santos - D98AGI2 - DS2Q22
 Bruno Goncalves de Oliveira - N404175 - DS2P22
 Rodrigo Dionisio Cunha - D98HGH9 - DS2Q22
 Matheus Souza Silva - N401869 - DS2P22
 Gustavo Alex Pinto - F027333 - DS2Q22
 Grupo 2 - Dia 04/12 - 19h50min
 Caminhos onde estao sendo salvos os arquivos: C:\\PIZZARIA_UNIP
*/

#define SIZE 200

char nome[SIZE][50];
char cod_produto2;
char email[SIZE][50];
int cpf[SIZE];
char telefone[SIZE][50];
int op;
char endereco[SIZE][50];
int cod_produto[SIZE];
float preco_produto;
char nome_produto[SIZE][50];
int cod_pedido[SIZE];
int telefone_pedido[SIZE];
char nome_pedido[SIZE];
int cod_produto_pedido[SIZE];

void cadastro_cliente();
void pesquisa_cliente();
void lista_cliente();
void menu_cliente();
void login();
void menu_principal();
void menu_estoque();
void cadastro_produto();
void lista_produto();
void pesquisa_produto();
void menu_pedidos();
void cadastro_pedido();
void consulta_pedido();
void lista_pedidos();

int main(void){
	
	login();
	
}


// tela de login 

void login(){
	
	char login[10] = "sys_pizza";
	char login1[10];
	char senha[10] = "pizza01";
	char senha1[10];
	
	telainicial:
	printf("\n\n\t\t\t BEM VINDO AO SISTEMA DA PIZZARIA UNIP\n\n");
	printf(" Necessario autenticacao para utilizacao do sistema!");
	printf("\n\n Digite o login: ");
	scanf("%s", &login1);
	printf(" Digite a senha: ");
	scanf("%s", &senha1);
	
	if (strcmp(login, login1) == 00 && strcmp(senha, senha1) == 00){
		
		printf("\n Logado com sucesso!");
		menu_principal();
		
	}
	
	else{
		
		printf("\n Usuario e/ou senha incorretos. Tente novamente.");
		system("PAUSE>>null");
		system("cls");
		goto telainicial;
		
	}
	
}

// menu principal

void menu_principal(){
	
	system("cls");
	printf("\n\n\t\t\t PIZZARIA UNIP - MENU PRINCIPAL\n\n");
	printf("\n\t 1 - MENU DE CLIENTES ");
	printf("\n\t 2 - MENU DE ESTOQUE ");
	printf("\n\t 3 - MENU DE PEDIDOS ");
	printf("\n\n SELECIONE UMA OPCAO: ");
	scanf("%d", &op);
	
	do{
		
		switch(op){
			
			case 1:
				menu_cliente();
				
				break;
				
			case 2:
				menu_estoque();
				
				break;
				
			case 3:
				menu_pedidos();
			
			
		}
		
	}while(op != 0);
	
}

// abaixo temos o menu e as opcoes da aba de ESTOQUE do software.

void menu_estoque(){
	
	int op2;
	
	do{
		
		
		system("cls");
		printf("\n\n\t\t\t PIZZARIA UNIP - MENU DE ESTOQUE\n\n");
		printf("\n\t 1 - CADASTRO DE PRODUTOS ");
		printf("\n\t 2 - CONSULTA DE PRODUTOS ");
		printf("\n\t 3 - LISTAGEM TOTAL DE PRODUTOS ");
		printf("\n\t 4 - RETORNAR AO MENU PRINCIPAL ");
		printf("\n\n SELECIONE UMA OPCAO: ");
		scanf("%d", &op);
		
			switch(op){
				
				case 1:
					cadastro_produto();
					break;
					
				case 2:
					pesquisa_produto();
					
					break;
				
				case 4:
					menu_principal();
					
					break;
					
				case 3:
					lista_produto();
					printf("\n\n Pressione 1 para retornar ao menu principal: ");
					scanf("%d", &op2);
					if(op2 == 1){
						
						menu_estoque();
						
					}
					
					
				else
					
				default:
				
				printf("\n Opcao invalida.");
				
				break;
				
			}
			
		}
			while(op!=0);
		
	
	
}

// aba de cadastro de produtos

void cadastro_produto(){
	
	static int linha;
	do {
		
		system("cls");
		printf("\n\n\t\t\t PIZZARIA UNIP - CADASTRO DE PRODUTOS\n\n");
		printf(" Digite o codigo do produto: ");
		scanf("%i", &cod_produto[linha]);
		printf(" Digite o nome do produto: ");
		scanf("%s", &nome_produto[linha]);
		printf(" Digite o valor do produto: ");
		scanf("%f", &preco_produto);
		printf("\n\n Digite 1 para efetuar novo cadastro ou outro numero para sair: ");
		scanf("%d", &op);
		system("cls");
		linha++;
		
		
		FILE *addproduto;
		addproduto = fopen("C:\\PIZZARIA_UNIP\\cadastro_produto.txt", "a");
		fprintf(addproduto, "\n Nome do produto: ");
		fputs(nome_produto, addproduto);
		fclose(addproduto);
				
	}while(op == 1);
}


// aba de pesquisa de produtos

void pesquisa_produto(){
	
	
	int codprod;
	int i;
	
	do{
		
		
		system("cls");
		printf("\n\n\t\t\t PIZZARIA UNIP - PESQUISA DE PRODUTOS\n\n");
		printf(" Digite o codigo do produto: ");
		scanf("%d", &codprod);
		
		for(i=0; i<SIZE; i++){
			if(cod_produto[i]==codprod){
					
				printf("\n Codigo do produto: %d\n Nome do produto: %s\n Preco do produto: %f", cod_produto[i], nome_produto[i], preco_produto);
				printf("\n\n Digite 1 para continuar pesquisando ou qualquer outro numero para retornar ao menu: ");
				scanf("%d", &op);
				
				switch (op){
					
					case 1:
					pesquisa_produto();	
					break;
					
					default:
					menu_estoque();
					
				}
				
				}
			else
			
			printf("\n Produto incorreto. \nPressione 1 para retornar ao menu ou qualquer outro numero para tentar novamente: ");
			scanf("%d", &op);
			
			if (op == 1){
				
				menu_estoque();
				
			}
			
			else
			system("PAUSE>>null");
			pesquisa_produto();
			
			}
		
		
		}while(op==1);
	
}	

// aba de listagem de produtos

void lista_produto(){
	
		int i;
	system("cls");
	printf("\n\n\t\t\t PIZZARIA UNIP - LISTAGEM DE PRODUTOS\n\n");
	for(i=0; i<SIZE; i++){
		
		
		if(cod_produto[i] > 0){
			
		printf("\n Codigo do produto: %d\n Nome do produto: %s\n Preco do produto: %f\n", cod_produto[i], nome_produto[i], preco_produto);
		
		
	}
		
	}
		
			
}

// abaixo temos o menu e as opcoes da aba de CLIENTES do software.

void menu_cliente(){
	
	int op2;
	
	do{
		
		
		system("cls");
		printf("\n\n\t\t\t PIZZARIA UNIP - MENU DE CLIENTES\n\n");
		printf("\n\t 1 - CADASTRO DE CLIENTES ");
		printf("\n\t 2 - CONSULTA DE CLIENTES ");
		printf("\n\t 3 - LISTAGEM TOTAL DE CLIENTES ");
		printf("\n\t 4 - RETORNAR AO MENU PRINCIPAL ");
		printf("\n\n SELECIONE UMA OPCAO: ");
		scanf("%d", &op);
		
			switch(op){
				
				case 1:
					cadastro_cliente();
					break;
					
				case 2:
					pesquisa_cliente();
					
					break;
				
				case 4:
					menu_principal();
					
					break;
					
				case 3:
					lista_cliente();
					printf("\n\n Pressione 1 para retornar ao menu principal: ");
					scanf("%d", &op2);
					if(op2 == 1){
						
						menu_cliente();
						
					}
					
					
				else
					
				default:
				
				printf("\n Opcao invalida.");
				
				break;
				
			}
			
		}
			while(op!=0);
		
	
	
}

// aba de cadastro de clientes

void cadastro_cliente(){
	
	static int linha;
	do {
		
		system("cls");
		printf("\n\n\t\t\t PIZZARIA UNIP - CADASTRO DE CLIENTES\n\n");
		printf(" Digite o nome do cliente: ");
		scanf("%s", &nome[linha]);
		printf(" Digite o e-mail do cliente: ");
		scanf("%s", &email[linha]);
		printf(" Digite o endereco do cliente: ");
		scanf("%s", &endereco[linha]);
		printf(" Digite o CPF do cliente: ");
		scanf("%d", &cpf[linha]);
		printf(" Digite o telefone do cliente: ");
		scanf("%s", &telefone[linha]);
		printf("\n\n Digite 1 para efetuar novo cadastro ou outro numero para sair: ");
		scanf("%d", &op);
		system("cls");
		linha++;
		
		FILE *addcliente;
		addcliente = fopen("C:\\PIZZARIA_UNIP\\cadastro_cliente.txt", "a");
		fprintf(addcliente, "\n\n  Nome do cliente: ");
		fputs(nome, addcliente);
		fprintf(addcliente, "| E-mail cadastrado: ");
		fputs(email, addcliente);
		fprintf(addcliente, "| Telefone cadastrado: ");
		fputs(telefone, addcliente);
		fclose(addcliente);
		
	}while(op == 1);
}

// aba de pesquisa de clientes

void pesquisa_cliente(){
	
	int cpfpesquisa;
	int telefonepesquisa;
	int i;
	
	do{
		
		
		system("cls");
		printf("\n\n\t\t\t PIZZARIA UNIP - PESQUISA DE CLIENTES\n\n");
		printf("\n Digite o CPF: ");
		scanf("%d", &cpfpesquisa);
		for(i=0; i<SIZE; i++){
					
					if(cpf[i]==cpfpesquisa){
						
					printf("\n Nome: %s\n E-mail: %s\n CPF: %d\n Endereco: %s\n Telefone: %s\n", nome[i], email[i], cpf[i], endereco[i], telefone[i]);
					
					printf("\n\n Digite 1 para continuar pesquisando, 2 para registrar pedido ou qualquer outro numero para retornar ao menu: ");
		scanf("%d", &op);
		
		switch(op){
		
			case 1:
				pesquisa_cliente();
				break;
				
			case 2:
				cadastro_pedido();
				break;
				
			default:
				
				menu_cliente();
				break;
			
		}
			}
				else
				
				printf("\n CPF invalido. Digite 1 para tentar novamente ou qualquer numero para retornar ao menu: ");
				scanf("%d", &op);
				
				switch(op){
					
				case 1:
				pesquisa_cliente();
				break;
				
				default:
				menu_cliente();
				break;
					
				}
				
					
					}
					
					
				
			
		}
		
		
		
		while(op==1);
}

// aba de listagem de clientes

void lista_cliente(){
		
	int i;
	system("cls");
	printf("\n\n\t\t\t PIZZARIA UNIP - LISTAGEM DE CLIENTES\n\n");
	for(i=0; i<SIZE; i++){
		
		
		if(cpf[i] > 0){
			
		printf("\n Nome: %s\n E-mail: %s\n CPF: %d\n Endereco: %s\n Telefone: %s\n", nome[i], email[i], cpf[i], endereco[i], telefone[i]);
		
		
	}
		
	}
	
}

// abaixo temos o menu e as opcoes da aba de PEDIDOS do software.

void menu_pedidos(){
	
	system("cls");
	printf("\n\n\t\t\t PIZZARIA UNIP - MENU DE PEDIDOS\n\n");
	printf("\n\t 1 - CADASTRO DE PEDIDO ");
	printf("\n\t 2 - CONSULTA DE PEDIDO ");
	printf("\n\t 3 - LISTAGEM TOTAL DE PEDIDOS ");
	printf("\n\t 4 - RETORNAR AO MENU PRINCIPAL ");
	printf("\n\n SELECIONE UMA OPCAO: ");
	scanf("%d", &op);
	
	switch(op){
		
		case 1:
			cadastro_pedido();
			break;
			
		case 2:
			consulta_pedido();
					
		case 3:
		lista_pedidos();
		printf("\n\n Pressione qualquer tecla para retornar ao menu principal: ");
		system("PAUSE>>NULL");
		menu_pedidos();
		
		
		case 4:
		menu_principal();
		break;
		
	}
	
}

// aba de cadastro de pedidos

void cadastro_pedido(){
	
	static int linha;
	do {
		
		system("cls");
		printf("\n\n\t\t\t PIZZARIA UNIP - CADASTRO DE PEDIDOS\n\n");
		printf(" Adicione um codigo ao pedido: ");
		scanf("%d", &cod_pedido[linha]);
		printf(" Digite o nome do cliente: ");
		scanf("%s", &nome_pedido[linha]);
		printf(" Digite o telefone do cliente: ");
		scanf("%d", &telefone_pedido[linha]);
		printf(" Digite o codigo do produto solicitado pelo cliente: ");
		scanf("%d", &cod_produto_pedido[linha]);
		printf("\n\n Digite 1 para efetuar novo cadastro ou outro numero para sair: ");
		scanf("%d", &op);
		linha++;
		
		FILE *addpedido;
		addpedido = fopen("C:\\PIZZARIA_UNIP\\cadastro_pedido.txt", "a");
		fprintf(addpedido, "\n\n  Código do pedido: ");
		fputs(cod_pedido, addpedido);
		fprintf(addpedido, "| Nome do cliente: ");
		fputs(nome_pedido, addpedido);
		fclose(addpedido);
		
		}while(op==1);
		
		
}

// aba de consulta de pedidos

void consulta_pedido(){
	
	
	int codpesquisas, i;
	
	do{
		
		printf("\n\n\t\t\t PIZZARIA UNIP - PESQUISA DE PEDIDOS\n\n");
		printf(" Digite o codigo do pedido: ");
		scanf("%d", &codpesquisas);
	
	for(i=0; i<SIZE; i++){
			if(cod_pedido[i]==codpesquisas){
					
				printf("\n Codigo do pedido: %d\n Nome do solicitante: %s", cod_pedido[i], nome_pedido[i]);
				printf("\n\n Digite 1 para continuar pesquisando ou qualquer outro numero para retornar ao menu: ");
				scanf("%d", &op);
				
				switch (op){
					
					case 1:
					consulta_pedido();	
					break;
					
					default:
					menu_pedidos();
					
				}
				
				}
			else
			
			printf("\n Pedido incorreto. \nPressione 1 para retornar ao menu ou qualquer outro numero para tentar novamente: ");
			scanf("%d", &op);
			
			if (op == 1){
				
				menu_pedidos();
				
			}
			
			else
			system("PAUSE>>null");
			consulta_pedido();
		system("cls");
			
			}
		
		
		}while(op==1);
	
}


// aba de listagem de pedidos

void lista_pedidos(){
	
	int a;
	system("cls");
	printf("\n\n\t\t\t PIZZARIA UNIP - LISTAGEM DE PEDIDOS\n\n");
	for(a=0; a<SIZE; a++){
		
		
		if(cod_pedido[a] > 0){
			
		printf("\n Codigo do pedido: %d\n Nome do solicitante: %s\n", cod_pedido[a], nome_pedido[a])	;
		
		
	}
		
	}
		
			
}	
