library(readxl)
#leiame kõik .xlsx lõpuga failid ette antud kaustas
xlsx_files=list.files('data/example_csv/',pattern = '*xlsx')

#ükshaaval käime failid läbi ja teeme järgnevad operatsioonid
for (fl in xlsx_files) {
  #prindime faili nime välja
  print(fl)
  #loome stringi, mis on teekond failini
  path=paste('data/example_csv/',fl,sep='')
  #loeme faili sisse, kui on csv, siis kasutada read_csv funktsiooni
  df=read_excel(path, col_names = F)
  #muudame arvuliseks väärtused kõik andmeraamis olevad väärtused
  df <- apply(df, 2, as.numeric)
  #faili nimi ilma laiendita
  name=strsplit(fl, '.xlsx')
  #lisame tiff laiendi
  name=paste(name, '.tiff')
  #lisame teekonna piltide kausta
  name=paste('data/example_csv/plots/', name, sep='')
  tiff(file = name)
  #joonistame pildi, 1:5 ja 1:5 näitavad dimensioone, hetkel on meil 5 rida ja veergu
  image(1:5, 1:5, df, col=gray((0:255)/255))
  dev.off()
}