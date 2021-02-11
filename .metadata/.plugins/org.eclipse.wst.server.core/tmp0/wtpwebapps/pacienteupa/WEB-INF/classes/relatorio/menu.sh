#!/bin/bash
x="teste"

menuUnidade () {

while true $x != "teste"
do
echo "================================================"
echo "Gerar versao Sistemas - Sistema: $SISTEMA_BUILD_XML"  
echo ""
echo "[1] 10.1.1.65"
echo "[2] 192.168.60.120"
echo "[3] 10.1.1.38"
echo "[4] 192.168.60.81"
echo "[5] 192.168.60.83"
echo ""
echo "[98] Voltar"
echo "[99] Sair"
echo ""
echo "================================================"

echo "Digite a opção desejada:"
read x
echo ""

case "$x" in 


    1)
	echo "Gerando Versao em 10.1.1.65..."
	echo "================================================"
	/mnt/desenv/65.sh
	menu
	;;
    2)
	echo "Gerando Versao em 192.168.60.120..."
	echo "================================================"
	/mnt/desenv/120.sh
	menu
	;;
	3)
	echo "Gerando Versao em 10.1.1.38..."
	echo "================================================"
	/mnt/desenv/38.sh
	menu
	;;
	4)
	echo "Gerando Versao em 192.168.60.81..."
	echo "================================================"
	/mnt/desenv/81.sh
	menu
	;;
	5)
	echo "Gerando Versao em 192.168.60.83..."
	echo "================================================"
	/mnt/desenv/83.sh
	menu
	;;
    
    98)
	menu
	;;
    99)
	echo "Saindo..."
	echo "================================================"
	exit 0;
	;;
*)
        echo "Opção inválida!"
	sleep 2
esac
done

}





menu () {
while true $x != "teste"
do
clear
echo "================================================"
echo "Gerar versao Sistemas"
echo ""
echo "[1] Paciente"
echo "[2] Paciente UPA"
echo "[3] Paciente-Schedule"
echo "[4] Sad"
echo "[5] Paciente Prescricao"
echo "[6] Seguranca"
echo "[7] SegurancaUPA"
echo "[8] Orcamento"
echo "[9] Almoxarifado"
echo "[10] Paciente Postgres"
echo "[11] Custos"
echo ""
echo "[99] Sair"
echo ""
echo "================================================"

echo "Digite a opção desejada:"
read x
echo ""

case "$x" in 


    1)
	#export URL_SVN="https://10.1.1.29/svn/ISGH_REPOSITORIO/tags/projeto_v6_paciente_sprint_2017_05-MIGRADO-GIT"
	export URL_GIT="http://script:kopenhagen@192.168.60.126/root/paciente-oracle.git"
	export URL_GIT_BRANCH="desenv" 
	export SISTEMA_BUILD_XML="paciente"	
	export NOME_PUBLICACAO="paciente"

	export ISGH_URL_DB="jdbc:oracle:thin:@10.1.1.60:1521:svrhgwa2"
	export ISGH_USER="medpoint"
	export ISGH_PASSWORD="sysmed"
	export ISGH_DRIVER="oracle.jdbc.driver.OracleDriver"
	export ISGH_DIALECT="org.hibernate.dialect.Oracle10gDialect"	
	
	clear
	menuUnidade
	;;
    2)

	export URL_SVN=""
	export URL_GIT="http://script:kopenhagen@192.168.60.126/root/pacienteupa.git"
	export URL_GIT_BRANCH="desenv" 
	export SISTEMA_BUILD_XML="pacienteupa"
	export NOME_PUBLICACAO="pacienteupa"

	#export ISGH_URL_DB="jdbc:postgresql://10.1.1.25:5432/UPAITPR"
	export ISGH_URL_DB="jdbc:postgresql://192.168.252.192:5432/UPA_ATN_BUG_TRACK"
	export ISGH_USER="postgres"
	export ISGH_PASSWORD="@admin#isgh"
	export ISGH_DRIVER="org.postgresql.Driver"
	export ISGH_DIALECT="org.hibernate.dialect.PostgreSQLDialect"

	clear
	menuUnidade
	;;

    3)

	export URL_SVN=""
	export URL_GIT="http://script:kopenhagen@192.168.60.126/root/paciente-schedule.git"
	export URL_GIT_BRANCH="master" 
	export SISTEMA_BUILD_XML="paciente-schedule"
	export NOME_PUBLICACAO="paciente-schedule"

	export ISGH_URL_DB="jdbc:postgresql://192.168.252.192:5432/UPA_ATN_BUG_TRACK"
	export ISGH_USER="postgres"
	export ISGH_PASSWORD="@admin#isgh"
	export ISGH_DRIVER="org.postgresql.Driver"
	export ISGH_DIALECT="org.hibernate.dialect.PostgreSQLDialect"

	#export ISGH_URL_DB="jdbc:oracle:thin:@192.168.60.80:1521:svrhml"
	#export ISGH_USER="medpoint"
	#export ISGH_PASSWORD="sysmed"
	#export ISGH_DRIVER="oracle.jdbc.driver.OracleDriver"
	#export ISGH_DIALECT="org.hibernate.dialect.Oracle10gDialect"


	clear
	menuUnidade
	;;

    4)

	export URL_SVN=""
	export URL_GIT="http://script:kopenhagen@192.168.60.126/root/sad.git"
	export URL_GIT_BRANCH="desenv" 
	export SISTEMA_BUILD_XML="sad"
	export NOME_PUBLICACAO="sad"

	export ISGH_URL_DB="jdbc:postgresql://10.1.1.24:5432/SAD_HML"
	export ISGH_USER="postgres"
	export ISGH_PASSWORD="@admin#isgh"
	export ISGH_DRIVER="org.postgresql.Driver"
	export ISGH_DIALECT="org.hibernate.dialect.PostgreSQLDialect"

	clear
	menuUnidade
	;;
    5)

	export URL_SVN="https://10.1.1.29/svn/ISGH_REPOSITORIO/tags/projeto_v6_paciente"
	export URL_GIT="http://script:kopenhagen@192.168.60.126/root/paciente-oracle.git"
	export URL_GIT_BRANCH="desenv" 
	export SISTEMA_BUILD_XML="paciente"	
	export NOME_PUBLICACAO="paciente"

	export ISGH_URL_DB="jdbc:oracle:thin:@192.168.60.80:1521:svrhml"
	export ISGH_USER="medpoint"
	export ISGH_PASSWORD="sysmed"
	export ISGH_DRIVER="oracle.jdbc.driver.OracleDriver"
	export ISGH_DIALECT="org.hibernate.dialect.Oracle10gDialect"	
	
	clear
	menuUnidade
	;;
     6)

	export URL_SVN=""
	export URL_GIT="http://script:kopenhagen@192.168.60.126/root/seguranca.git"
	export URL_GIT_BRANCH="sprint" 
	export SISTEMA_BUILD_XML="seguranca"
	export NOME_PUBLICACAO="seguranca"
	
	export ISGH_URL_DB="jdbc:postgresql://192.168.60.84:5432/paciente_hrc"
	export ISGH_USER="postgres"
	export ISGH_PASSWORD="@admin#isgh"
	export ISGH_DRIVER="org.postgresql.Driver"
	export ISGH_DIALECT="org.hibernate.dialect.PostgreSQLDialect"
	
	#export ISGH_URL_DB="jdbc:oracle:thin:@192.168.60.80:1521:svrhml"
	#export ISGH_USER="medpoint"
	#export ISGH_PASSWORD="sysmed"
	#export ISGH_DRIVER="oracle.jdbc.driver.OracleDriver"
	#export ISGH_DIALECT="org.hibernate.dialect.Oracle10gDialect"	

	clear
	menuUnidade
	;;
     7)

	export URL_SVN=""
	export URL_GIT="http://script:kopenhagen@192.168.60.126/root/seguranca-upa.git"
	export URL_GIT_BRANCH="sprint" 
	export SISTEMA_BUILD_XML="seguranca-upa"
	export NOME_PUBLICACAO="segurancaupa"

	export ISGH_URL_DB="jdbc:postgresql://192.168.60.120:5432/SYSHOSP_PROD"
	export ISGH_USER="postgres"
	export ISGH_PASSWORD="@isgh#upa"
	export ISGH_DRIVER="org.postgresql.Driver"
	export ISGH_DIALECT="org.hibernate.dialect.PostgreSQLDialect"	

	clear
	menuUnidade
	;;
     8)

	export URL_SVN=""
	export URL_GIT="http://script:kopenhagen@192.168.60.126/root/orcamento.git"
	export URL_GIT_BRANCH="sprint" 
	export SISTEMA_BUILD_XML="orcamento"
	export NOME_PUBLICACAO="orcamento"

	export ISGH_URL_DB="jdbc:postgresql://192.168.60.120:5432/SYSHOSP_PROD"
	export ISGH_USER="postgres"
	export ISGH_PASSWORD="@isgh#upa"
	export ISGH_DRIVER="org.postgresql.Driver"
	export ISGH_DIALECT="org.hibernate.dialect.PostgreSQLDialect"	

	clear
	menuUnidade
	;;
     9)

	export URL_SVN=""
	export URL_GIT="http://script:kopenhagen@192.168.60.126/root/almox.git"
	export URL_GIT_BRANCH="sprint" 
	export SISTEMA_BUILD_XML="almox"
	export NOME_PUBLICACAO="almox"

	export ISGH_URL_DB="jdbc:postgresql://192.168.60.120:5432/SYSHOSP_PROD"
	export ISGH_USER="postgres"
	export ISGH_PASSWORD="@isgh#upa"
	export ISGH_DRIVER="org.postgresql.Driver"
	export ISGH_DIALECT="org.hibernate.dialect.PostgreSQLDialect"	

	clear
	menuUnidade
	;;
     10)

	export URL_SVN=""
	export URL_GIT="http://script:kopenhagen@192.168.60.126/root/paciente-postgres.git"
	export URL_GIT_BRANCH="sprint10" 
	export SISTEMA_BUILD_XML="paciente"	
	export NOME_PUBLICACAO="paciente"
	
	export ISGH_URL_DB="jdbc:postgresql://192.168.252.192:5432/paciente_hrn2"
	export ISGH_USER="postgres"
	export ISGH_PASSWORD="@admin#isgh"
	export ISGH_DRIVER="org.postgresql.Driver"
	export ISGH_DIALECT="org.hibernate.dialect.PostgreSQLDialect"	

	clear
	menuUnidade
	;;
	 11)

	export URL_SVN=""
	export URL_GIT="http://script:kopenhagen@192.168.60.126/root/custos.git"
	export URL_GIT_BRANCH="sprint" 
	export SISTEMA_BUILD_XML="custos"
	export NOME_PUBLICACAO="custos"

	export ISGH_URL_DB="jdbc:postgresql://192.168.60.120:5432/SYSHOSP_PROD"
	export ISGH_USER="postgres"
	export ISGH_PASSWORD="@isgh#upa"
	export ISGH_DRIVER="org.postgresql.Driver"
	export ISGH_DIALECT="org.hibernate.dialect.PostgreSQLDialect"	

	clear
	menuUnidade
	;;


    
    99)
	echo "Saindo..."
	echo "================================================"
	exit 0;
	;;
*)
        echo "Opção inválida!"
	sleep 2
esac
done

}

menu
