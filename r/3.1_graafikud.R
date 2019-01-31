us_state_populations<-read.csv("data/introductory_state_example.csv")
us_state_populations$population_thousand=us_state_populations$population/1000

plot(us_state_populations$year,us_state_populations$population_thousand, 
     main="Scatterplot of year vs population")

hist(us_state_populations$population_thousand, main="Histogram of population", breaks = 30)
boxplot(us_state_populations$population_thousand, main="Boxplot of population")


##ggplot
library(tidyverse)

plt=ggplot(us_state_populations, aes(year, population_thousand))+
  #lisame geom kihi, antud juhul tahame punkte
  geom_point()+
  ggtitle("Population distribution")+
  theme_minimal()
plt

#geom smooth lisab trendijoone (tehes mudeli võimaliku trendi kohta)
plt+geom_smooth()+
  #täpsustame regressiooni tüübi, tahame lineaarset regressiooni
  geom_smooth(method=lm, color='lightgreen')+
  theme_classic()


ggplot(us_state_populations, aes(year, population_thousand))+
  #ajab punktid juhuslikkusega laiali, alpha määrab läbipaistvuse
  geom_jitter(alpha=0.3, color="blue")+
  ggtitle("Population distribution")+
  geom_smooth(method=lm, color='red')+
  theme_minimal()


#line
df_ohio=us_state_populations[us_state_populations$state=="Ohio",]
#plotime
ggplot(df_ohio, aes(year, population_thousand))+
  geom_line(color="red")+
  ggtitle("Population of Ohio")+
  theme_minimal()


df_ohio_alabama=us_state_populations[us_state_populations$state %in% c('Ohio', 'Alabama'),]

ggplot(df_ohio_alabama, aes(year, population_thousand))+
  geom_line(aes(group=state, color=state))+
  ggtitle("Population of Ohio and Alabama")+
  theme_minimal()

#tulpdiagram
ggplot(df_ohio_alabama, aes(year, population_thousand))+
  #stat=identity määrab, et näitab muutuja tegelikku väärtust, mitte counti
  #position_dodge() tõstab tulbad, üksteise kõrvale
  geom_bar(stat='identity', aes(fill=state), position=position_dodge())+
  ggtitle("Population of Ohio and Alabama")+
  theme_minimal()

#boxplot
ggplot(us_state_populations, aes(year, population_thousand, group=year))+
  geom_boxplot(fill='lightgreen', color='blue')+
  ggtitle("Distribution of population")+
  theme_minimal()

#histogram
ggplot(us_state_populations, aes(x=population_thousand))+
  geom_histogram(color="black", fill="lightblue", linetype="dashed")+
  theme_light()

#density
ggplot(us_state_populations, aes(x=population_thousand))+
  geom_density(color="black", fill="lightblue", linetype="dashed")+
  theme_light()

#facet
alaska_alabama_california=us_state_populations[us_state_populations$state %in%
                                                 c("Alaska", "Alabama", "California"), ]
ggplot(alaska_alabama_california, aes(x=year, y=population_thousand))+
  geom_point()+
  facet_wrap(~state, ncol=3,scales = "free_y")+
  theme_minimal()

#saala muutmine
p <- ggplot(mtcars, aes(disp, wt)) +
  geom_point() +
  geom_smooth()+
  theme_minimal()
p
#mis juhtub
p+xlim(200,350)
#aga nüüd
p + coord_cartesian(xlim = c(200, 350))



##salvestamine
png("myplot.png")
myplot <-ggplot(us_state_populations, aes(x=population_thousand))+
  geom_density(color="black", fill="lightblue", linetype="dashed")+
  theme_light()
#prindime faili
print(myplot)
#sulgeme faili
dev.off()