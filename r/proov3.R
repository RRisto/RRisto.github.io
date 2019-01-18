vec=c(1,2,3)
vec1=c(5,6,7)

data.frame(vec, vec1)
df=data.frame(vec, vec1)

names(df)=c("esimene", "teine")
df[1]
df[1,1]
is.na(df[1])


df[c(1,2), c(1,2)]
dim(df)
df[c("esimene")]
df$esimene
ncol(df)
nrow(df)
df
df[1,1]=100
df


df2=df
df2
df_all=rbind(df,df2)
df_all

x <- data.frame(k1 = c(NA,NA,3,4,5), 
                k2 = c(1,NA,NA,4,5), 
                data = 1:5)
y <- data.frame(k1 = c(NA,2,NA,4,5), 
                k2 = c(NA,NA,3,4,5), 
                data = 1:5)
merge(x, y, by.x='data', by.y='data') # NA's match
states=read.csv('data/states.csv')
