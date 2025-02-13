USE [master]
GO
/****** Object:  Database [FinanceActivities]    Script Date: 21/10/2019 18:27:28 ******/
CREATE DATABASE [FinanceActivities]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'FinanceActivities', FILENAME = N'E:\SQL\MSSQL14.SQLEXPRESS\MSSQL\DATA\FinanceActivities.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'FinanceActivities_log', FILENAME = N'E:\SQL\MSSQL14.SQLEXPRESS\MSSQL\DATA\FinanceActivities_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [FinanceActivities] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [FinanceActivities].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [FinanceActivities] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [FinanceActivities] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [FinanceActivities] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [FinanceActivities] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [FinanceActivities] SET ARITHABORT OFF 
GO
ALTER DATABASE [FinanceActivities] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [FinanceActivities] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [FinanceActivities] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [FinanceActivities] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [FinanceActivities] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [FinanceActivities] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [FinanceActivities] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [FinanceActivities] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [FinanceActivities] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [FinanceActivities] SET  DISABLE_BROKER 
GO
ALTER DATABASE [FinanceActivities] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [FinanceActivities] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [FinanceActivities] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [FinanceActivities] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [FinanceActivities] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [FinanceActivities] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [FinanceActivities] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [FinanceActivities] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [FinanceActivities] SET  MULTI_USER 
GO
ALTER DATABASE [FinanceActivities] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [FinanceActivities] SET DB_CHAINING OFF 
GO
ALTER DATABASE [FinanceActivities] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [FinanceActivities] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [FinanceActivities] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [FinanceActivities] SET QUERY_STORE = OFF
GO
USE [FinanceActivities]
GO
/****** Object:  Table [dbo].[TransActions]    Script Date: 21/10/2019 18:27:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TransActions](
	[ActivityID] [int] IDENTITY(1,1) NOT NULL,
	[Activity Type] [varchar](10) NOT NULL,
	[Date of Activity] [date] NOT NULL,
	[Value of Activity] [money] NOT NULL,
	[Description of Activity] [nvarchar](100) NULL,
	[Type Of Expense] [varchar](15) NULL,
 CONSTRAINT [PK_TransActions] PRIMARY KEY CLUSTERED 
(
	[ActivityID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[TransActions] ON 

INSERT [dbo].[TransActions] ([ActivityID], [Activity Type], [Date of Activity], [Value of Activity], [Description of Activity], [Type Of Expense]) VALUES (26, N'Expense', CAST(N'0001-06-06' AS Date), 333.0000, N'try2', N'Phone')
INSERT [dbo].[TransActions] ([ActivityID], [Activity Type], [Date of Activity], [Value of Activity], [Description of Activity], [Type Of Expense]) VALUES (27, N'Income', CAST(N'2000-04-11' AS Date), 145.0000, N'try1', NULL)
INSERT [dbo].[TransActions] ([ActivityID], [Activity Type], [Date of Activity], [Value of Activity], [Description of Activity], [Type Of Expense]) VALUES (29, N'Income', CAST(N'2019-10-21' AS Date), 222.0000, N'222', NULL)
INSERT [dbo].[TransActions] ([ActivityID], [Activity Type], [Date of Activity], [Value of Activity], [Description of Activity], [Type Of Expense]) VALUES (31, N'Expense', CAST(N'2000-04-03' AS Date), 2.0000, N'333', N'Vatless')
INSERT [dbo].[TransActions] ([ActivityID], [Activity Type], [Date of Activity], [Value of Activity], [Description of Activity], [Type Of Expense]) VALUES (35, N'Expense', CAST(N'2009-01-12' AS Date), 210.0000, N'yep', N'Car')
INSERT [dbo].[TransActions] ([ActivityID], [Activity Type], [Date of Activity], [Value of Activity], [Description of Activity], [Type Of Expense]) VALUES (38, N'Expense', CAST(N'2012-08-02' AS Date), 222.0000, N'new ice cream', N'Refreshments')
SET IDENTITY_INSERT [dbo].[TransActions] OFF
USE [master]
GO
ALTER DATABASE [FinanceActivities] SET  READ_WRITE 
GO
