library(tidyverse)
us_state_populations<-read.csv("data/introductory_state_example.csv")
head(us_state_populations)
str(us_state_populations)
summary(us_state_populations)

#tulemus omistatakse muutujale df_california_ny, aluseks võtame andmed
#muutujast us_state_populations
df_california_ny<-us_state_populations %>% 
  #filtreerimne välja osariigid, millen nimed on alltoodud vektoris c(...)
  filter(state %in% c("California", "New York"))
dim(df_california_ny)

head(df_california_ny)
unique(df_california_ny$state)
unique(df_california_ny[,c('state')])


df_california_ny_1900<-us_state_populations %>% 
  #filtreerimne välja osariigid, millen nimed on alltoodud vektoris c(...)
  filter(state %in% c("California", "New York"))%>%
  filter(year>=1900)
dim(df_california_ny_1900)

### Summeerimine
df_describe=us_state_populations %>% 
  #filtreerimne välja osariigid, millen nimed on alltoodud vektoris c(...)
  filter(state %in% c("California", "New York"))%>%
  #grupeerime osariigi järgi
  group_by(state)%>%
  #arvutame iga grupi kohta keskmise ja st. hälve
  summarise(keskmine=mean(population),
            mediaan=median(population), 
            mood=mode(population),
            sandardhälve=sd(population))

##muutujate loomine
us_state_populations<-us_state_populations %>% 
  #mutate loob uue muutuja olemasolevate kõrvale
  mutate(population_thousand=population/1000)

###muutujate nimede muutmine
#asendame tühikud alakriipsuga
us_state_populations$state=gsub(" ", "_", us_state_populations$state)
#teeme väiketähtdeks
us_state_populations$state=tolower(us_state_populations$state)
head(us_state_populations)


#arvutame vaatluste arvu igas grupis
#kahanev järjestus
us_state_populations%>%
  group_by(state)%>%
  summarise(count=n())%>% #n() tähendab counti, käesoleval iga grupi (osariigi) elementide counti
  arrange(desc(count))%>%
  head()

#kasvav järjestus
us_state_populations%>%
  group_by(state)%>%
  summarise(count=n())%>%
  arrange(count)%>%
  head(20)


#nüüd võime välja filtreerida osariigid, kus  on üle 20 vaatluse
us_state_populations%>%
  group_by(state)%>%
  summarise(count=n())%>%
  arrange(desc(count))%>%
  filter(count>20)

#lag
us_state_populations %>%
  group_by(year) %>%
  summarise(obs_count = n()) %>%
  #lag() võtab eelmise grupi (aasta) obs_count väärtuse
  mutate(change = obs_count - lag(obs_count))%>% 
  head()


#lai ja pikk formaat
data_wide <- spread(us_state_populations[,c('year','state','population')], year, population)
head(data_wide)

library(reshape2)
data_long<-melt(data_wide, id=c("state"))
tail(data_long)