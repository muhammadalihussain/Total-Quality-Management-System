USE [master]
GO
/****** Object:  Database [TQMS]    Script Date: 5/11/2026 12:07:48 AM ******/
CREATE DATABASE [TQMS]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'TQMS', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL13.MSSQLSERVER2016\MSSQL\DATA\TQMS.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'TQMS_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL13.MSSQLSERVER2016\MSSQL\DATA\TQMS_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [TQMS] SET COMPATIBILITY_LEVEL = 130
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [TQMS].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [TQMS] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [TQMS] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [TQMS] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [TQMS] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [TQMS] SET ARITHABORT OFF 
GO
ALTER DATABASE [TQMS] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [TQMS] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [TQMS] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [TQMS] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [TQMS] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [TQMS] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [TQMS] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [TQMS] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [TQMS] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [TQMS] SET  DISABLE_BROKER 
GO
ALTER DATABASE [TQMS] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [TQMS] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [TQMS] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [TQMS] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [TQMS] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [TQMS] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [TQMS] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [TQMS] SET RECOVERY FULL 
GO
ALTER DATABASE [TQMS] SET  MULTI_USER 
GO
ALTER DATABASE [TQMS] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [TQMS] SET DB_CHAINING OFF 
GO
ALTER DATABASE [TQMS] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [TQMS] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [TQMS] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'TQMS', N'ON'
GO
ALTER DATABASE [TQMS] SET QUERY_STORE = OFF
GO
USE [TQMS]
GO
ALTER DATABASE SCOPED CONFIGURATION SET LEGACY_CARDINALITY_ESTIMATION = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 0;
GO
ALTER DATABASE SCOPED CONFIGURATION SET PARAMETER_SNIFFING = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION SET QUERY_OPTIMIZER_HOTFIXES = OFF;
GO
USE [TQMS]
GO
/****** Object:  UserDefinedFunction [dbo].[fun_splitstring]    Script Date: 5/11/2026 12:07:48 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create FUNCTION [dbo].[fun_splitstring] ( @stringToSplit VARCHAR(8000) )
    RETURNS
        @returnList TABLE ([Param] [nvarchar] (500))
AS
 
BEGIN
 
    DECLARE @name NVARCHAR(255)
    DECLARE @pos INT
 
    WHILE CHARINDEX(',', @stringToSplit) > 0
    BEGIN
        SELECT @pos  = CHARINDEX(',', @stringToSplit) 
        SELECT @name = SUBSTRING(@stringToSplit, 1, @pos-1)
 
        INSERT INTO @returnList
        SELECT @name
 
        SELECT @stringToSplit = SUBSTRING(@stringToSplit, @pos+1, LEN(@stringToSplit)-@pos)
    END
 
    INSERT INTO @returnList
    SELECT @stringToSplit
 
    RETURN
END


--SELECT [Param] FROM dbo.splitstring('a,b,c')
GO
/****** Object:  Table [dbo].[AnalysisCategories]    Script Date: 5/11/2026 12:07:48 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AnalysisCategories](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CategoryName] [varchar](100) NULL,
	[IsActive] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CAPA]    Script Date: 5/11/2026 12:07:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CAPA](
	[CAPAID] [int] IDENTITY(1,1) NOT NULL,
	[CAPA_Code] [nvarchar](50) NOT NULL,
	[Description] [nvarchar](max) NULL,
	[FromDepartmentID] [int] NULL,
	[CreatedBy] [int] NULL,
	[Priority] [nvarchar](20) NULL,
	[StatusId] [nvarchar](50) NULL,
	[TargetDate] [date] NULL,
	[ClosureDate] [date] NULL,
	[CreatedAt] [datetime] NULL,
	[UpdatedAt] [datetime] NULL,
	[ClosedAt] [datetime] NULL,
	[ItemId] [nvarchar](50) NULL,
	[ItemVarietyID] [nvarchar](50) NULL,
	[SalesId] [nvarchar](50) NULL,
	[Site] [nchar](10) NULL,
	[Customer] [nvarchar](50) NULL,
	[ItemName] [nvarchar](50) NULL,
	[RejectRemarks] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[CAPAID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CAPA_Assignments]    Script Date: 5/11/2026 12:07:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CAPA_Assignments](
	[AssignmentID] [int] IDENTITY(1,1) NOT NULL,
	[CAPAID] [int] NOT NULL,
	[UserID] [int] NOT NULL,
	[IsActive] [bit] NULL,
	[CreatedAt] [datetime] NULL,
	[CreatedBy] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[AssignmentID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CAPAActions]    Script Date: 5/11/2026 12:07:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CAPAActions](
	[ActionID] [int] IDENTITY(1,1) NOT NULL,
	[RootCauseID] [int] NULL,
	[ActionCode] [nvarchar](50) NULL,
	[ActionType] [nvarchar](20) NULL,
	[ActionTitle] [nvarchar](255) NULL,
	[ActionDescription] [nvarchar](max) NULL,
	[AssignedTo] [int] NULL,
	[DueDate] [date] NULL,
	[Status] [nvarchar](50) NULL,
	[Priority] [nvarchar](20) NULL,
	[CreatedBy] [int] NULL,
	[CreatedAt] [datetime] NULL,
	[CompletedAt] [datetime] NULL,
	[CompletionRemarks] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[ActionID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CAPAAssignments]    Script Date: 5/11/2026 12:07:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CAPAAssignments](
	[AssignmentID] [int] IDENTITY(1,1) NOT NULL,
	[CAPAID] [int] NULL,
	[RootCauseID] [int] NULL,
	[ActionID] [int] NULL,
	[AssignedTo] [int] NULL,
	[AssignedBy] [int] NULL,
	[AssignmentDate] [datetime] NULL,
	[ExpectedCompletionDate] [date] NULL,
	[ActualCompletionDate] [date] NULL,
	[ActionTaken] [bit] NULL,
	[ActionTakenRemarks] [nvarchar](max) NULL,
	[IsEffective] [bit] NULL,
	[EffectivenessRemarks] [nvarchar](max) NULL,
	[EffectivenessCheckedBy] [int] NULL,
	[EffectivenessCheckedAt] [datetime] NULL,
	[Status] [nvarchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[AssignmentID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Categories]    Script Date: 5/11/2026 12:07:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Categories](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](150) NULL,
	[IsActve] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Certifications]    Script Date: 5/11/2026 12:07:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Certifications](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ProductId] [int] NULL,
	[CertificationName] [varchar](100) NULL,
	[IsActive] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[COA]    Script Date: 5/11/2026 12:07:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[COA](
	[COAID] [int] IDENTITY(1,1) NOT NULL,
	[COA_Code] [nvarchar](50) NOT NULL,
	[CAPAID] [int] NULL,
	[COA_Type] [nvarchar](50) NULL,
	[PreparedBy] [int] NULL,
	[CheckedBy] [int] NULL,
	[ApprovedBy] [int] NULL,
	[COA_Status] [nvarchar](50) NULL,
	[Result] [nvarchar](50) NULL,
	[OverallRemarks] [nvarchar](max) NULL,
	[PreparedAt] [datetime] NULL,
	[CheckedAt] [datetime] NULL,
	[ApprovedAt] [datetime] NULL,
	[ValidUntil] [date] NULL,
	[DocumentURL] [nvarchar](500) NULL,
PRIMARY KEY CLUSTERED 
(
	[COAID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[COATestResults]    Script Date: 5/11/2026 12:07:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[COATestResults](
	[COATestResultID] [int] IDENTITY(1,1) NOT NULL,
	[COAID] [int] NULL,
	[TestParameter] [nvarchar](255) NULL,
	[Specification] [nvarchar](max) NULL,
	[ResultValue] [nvarchar](255) NULL,
	[Unit] [nvarchar](50) NULL,
	[IsCompliant] [bit] NULL,
	[TestMethod] [nvarchar](255) NULL,
	[Remarks] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[COATestResultID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Colors]    Script Date: 5/11/2026 12:07:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Colors](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](100) NULL,
	[IsActive] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Departments]    Script Date: 5/11/2026 12:07:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Departments](
	[DepartmentID] [int] IDENTITY(1,1) NOT NULL,
	[DepartmentCode] [nvarchar](20) NOT NULL,
	[DepartmentName] [nvarchar](100) NOT NULL,
	[Description] [nvarchar](255) NULL,
	[IsActive] [bit] NULL,
	[CreatedAt] [datetime] NULL,
	[UpdatedAt] [datetime] NULL,
	[Email] [nvarchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[DepartmentID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[EmailConcernDeparts]    Script Date: 5/11/2026 12:07:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EmailConcernDeparts](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[DepartmentID] [int] NOT NULL,
	[CAPAID] [int] NULL,
 CONSTRAINT [PK_EmailConcernDeparts] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Forms]    Script Date: 5/11/2026 12:07:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Forms](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NULL,
	[IsActive] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[IssueName]    Script Date: 5/11/2026 12:07:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[IssueName](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[IssueNo] [nvarchar](50) NULL,
 CONSTRAINT [PK_IssueName] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MenuItems]    Script Date: 5/11/2026 12:07:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MenuItems](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](50) NULL,
	[Url] [nvarchar](100) NULL,
	[ParentId] [int] NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedDate] [datetime] NOT NULL,
	[Icon] [nvarchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Packaging]    Script Date: 5/11/2026 12:07:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Packaging](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ProductId] [int] NULL,
	[Material] [varchar](100) NULL,
	[NetWeight] [varchar](50) NULL,
	[IsActive] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Permissions]    Script Date: 5/11/2026 12:07:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Permissions](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Code] [nvarchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProductAnalysis]    Script Date: 5/11/2026 12:07:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProductAnalysis](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ProductId] [int] NULL,
	[CategoryId] [int] NULL,
	[ParameterName] [varchar](150) NULL,
	[Unit] [varchar](50) NULL,
	[Limits] [varchar](50) NULL,
	[Status] [varchar](20) NULL,
	[IsActive] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Products]    Script Date: 5/11/2026 12:07:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Products](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ProductName] [nvarchar](200) NULL,
	[ProductCode] [nvarchar](50) NULL,
	[CategoryID] [int] NULL,
	[FormID] [int] NULL,
	[ColorID] [int] NULL,
	[CountryOfOrigin] [nvarchar](100) NULL,
	[Ingredients] [nvarchar](max) NULL,
	[IngredientsDeclaration] [nvarchar](max) NULL,
	[SuitableFor] [nvarchar](200) NULL,
	[Additives] [nvarchar](200) NULL,
	[Functionalities] [nvarchar](200) NULL,
	[Description] [nvarchar](max) NULL,
	[ShelfLife] [nvarchar](200) NULL,
	[StorageConditions] [nvarchar](max) NULL,
	[Uses] [nvarchar](max) NULL,
	[CreatedAt] [datetime] NULL,
	[IsActive] [bit] NULL,
 CONSTRAINT [PK_Products] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[QCTestResults]    Script Date: 5/11/2026 12:07:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[QCTestResults](
	[TestResultID] [int] IDENTITY(1,1) NOT NULL,
	[CAPAID] [int] NULL,
	[ActionID] [int] NULL,
	[TestCode] [nvarchar](50) NULL,
	[TestName] [nvarchar](255) NULL,
	[TestParameters] [nvarchar](max) NULL,
	[ExpectedResult] [nvarchar](max) NULL,
	[ActualResult] [nvarchar](max) NULL,
	[IsPassed] [bit] NULL,
	[TestedBy] [int] NULL,
	[TestedAt] [datetime] NULL,
	[VerifiedBy] [int] NULL,
	[VerifiedAt] [datetime] NULL,
	[Remarks] [nvarchar](max) NULL,
	[TestReportURL] [nvarchar](500) NULL,
PRIMARY KEY CLUSTERED 
(
	[TestResultID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RoleMenus]    Script Date: 5/11/2026 12:07:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RoleMenus](
	[RoleId] [int] NOT NULL,
	[MenuId] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[RoleId] ASC,
	[MenuId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Roles]    Script Date: 5/11/2026 12:07:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Roles](
	[RoleID] [int] IDENTITY(1,1) NOT NULL,
	[RoleCode] [nvarchar](30) NOT NULL,
	[RoleName] [nvarchar](100) NOT NULL,
	[RoleLevel] [int] NULL,
	[Description] [nvarchar](255) NULL,
	[IsActive] [bit] NULL,
	[CreatedAt] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[RoleID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RootCauses]    Script Date: 5/11/2026 12:07:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RootCauses](
	[RootCauseID] [int] IDENTITY(1,1) NOT NULL,
	[CAPAID] [int] NULL,
	[RootCauseCode] [nvarchar](50) NULL,
	[RootCauseTitle] [nvarchar](255) NOT NULL,
	[RootCauseDetails] [nvarchar](max) NULL,
	[Category] [nvarchar](100) NULL,
	[CreatedBy] [int] NULL,
	[CreatedAt] [datetime] NULL,
	[IsVerified] [bit] NULL,
	[VerifiedBy] [int] NULL,
	[VerifiedAt] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[RootCauseID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Sites]    Script Date: 5/11/2026 12:07:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sites](
	[SiteID] [int] IDENTITY(1,1) NOT NULL,
	[SiteName] [nvarchar](100) NOT NULL,
	[Description] [nvarchar](max) NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedDate] [datetime] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[SiteID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Status]    Script Date: 5/11/2026 12:07:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Status](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[StatusName] [nvarchar](50) NULL,
	[IsActive] [bit] NULL,
 CONSTRAINT [PK_Status] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 5/11/2026 12:07:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[UserID] [int] IDENTITY(1,1) NOT NULL,
	[UserCode] [nvarchar](50) NOT NULL,
	[FullName] [nvarchar](255) NOT NULL,
	[Email] [nvarchar](255) NULL,
	[PasswordHash] [nvarchar](255) NULL,
	[PhoneNumber] [nvarchar](20) NULL,
	[DepartmentID] [int] NULL,
	[RoleID] [int] NULL,
	[ReportingTo] [int] NULL,
	[IsActive] [bit] NULL,
	[CreatedAt] [datetime] NULL,
	[UpdatedAt] [datetime] NULL,
	[LastLogin] [datetime] NULL,
	[RawPassword] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[UserID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserSiteAccess]    Script Date: 5/11/2026 12:07:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserSiteAccess](
	[AccessID] [int] IDENTITY(1,1) NOT NULL,
	[UserID] [int] NOT NULL,
	[SiteID] [int] NOT NULL,
	[IsActive] [bit] NULL,
	[GrantedDate] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[AccessID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[AnalysisCategories] ON 

INSERT [dbo].[AnalysisCategories] ([Id], [CategoryName], [IsActive]) VALUES (1, N'Chemical Parameters', 1)
INSERT [dbo].[AnalysisCategories] ([Id], [CategoryName], [IsActive]) VALUES (2, N'Heavy Metals', 1)
INSERT [dbo].[AnalysisCategories] ([Id], [CategoryName], [IsActive]) VALUES (3, N'Microbiological Parameters', 1)
INSERT [dbo].[AnalysisCategories] ([Id], [CategoryName], [IsActive]) VALUES (4, N'Allergens', 1)
SET IDENTITY_INSERT [dbo].[AnalysisCategories] OFF
GO
SET IDENTITY_INSERT [dbo].[CAPA] ON 

INSERT [dbo].[CAPA] ([CAPAID], [CAPA_Code], [Description], [FromDepartmentID], [CreatedBy], [Priority], [StatusId], [TargetDate], [ClosureDate], [CreatedAt], [UpdatedAt], [ClosedAt], [ItemId], [ItemVarietyID], [SalesId], [Site], [Customer], [ItemName], [RejectRemarks]) VALUES (1, N'CAPA-001', N'Motor not working in Line-1, causing production delay', 1, 1, N'HIGH', N'7', CAST(N'1900-01-01' AS Date), CAST(N'1900-01-01' AS Date), CAST(N'2025-04-24T10:30:00.000' AS DateTime), CAST(N'2026-05-06T15:03:00.820' AS DateTime), NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'asdsadsa')
INSERT [dbo].[CAPA] ([CAPAID], [CAPA_Code], [Description], [FromDepartmentID], [CreatedBy], [Priority], [StatusId], [TargetDate], [ClosureDate], [CreatedAt], [UpdatedAt], [ClosedAt], [ItemId], [ItemVarietyID], [SalesId], [Site], [Customer], [ItemName], [RejectRemarks]) VALUES (11, N'CAPA-002', N'test', 1, 1, N'MEDIUM', N'6', CAST(N'2026-05-08' AS Date), CAST(N'2026-05-08' AS Date), CAST(N'2026-04-23T15:28:42.353' AS DateTime), CAST(N'2026-05-08T14:21:32.727' AS DateTime), NULL, N'ITM-000029', N'V0005', N'014465', N'1         ', N'ZAINAB & AISHA ENTERPRISE', N'TIN 25Kg Rice Glucose 45 BE', N'')
INSERT [dbo].[CAPA] ([CAPAID], [CAPA_Code], [Description], [FromDepartmentID], [CreatedBy], [Priority], [StatusId], [TargetDate], [ClosureDate], [CreatedAt], [UpdatedAt], [ClosedAt], [ItemId], [ItemVarietyID], [SalesId], [Site], [Customer], [ItemName], [RejectRemarks]) VALUES (12, N'CAPA-012', N'test', 1, 1, N'MEDIUM', N'7', CAST(N'1900-01-01' AS Date), CAST(N'1900-01-01' AS Date), CAST(N'2026-05-07T15:24:22.180' AS DateTime), CAST(N'2026-05-08T09:06:32.353' AS DateTime), NULL, N'ITM-000909', N'V0031', N'013869', N'1         ', N'ADDITIVE SOLUTIONS PTY LTD', N'SPACEKRAFT IBC TOTES 1364 KG', N'sorry this item has been rejected')
INSERT [dbo].[CAPA] ([CAPAID], [CAPA_Code], [Description], [FromDepartmentID], [CreatedBy], [Priority], [StatusId], [TargetDate], [ClosureDate], [CreatedAt], [UpdatedAt], [ClosedAt], [ItemId], [ItemVarietyID], [SalesId], [Site], [Customer], [ItemName], [RejectRemarks]) VALUES (13, N'CAPA-013', N'test', 1, 1, N'MEDIUM', N'6', CAST(N'2026-05-08' AS Date), CAST(N'2026-05-06' AS Date), CAST(N'2026-05-07T15:34:52.833' AS DateTime), CAST(N'2026-05-08T15:05:57.303' AS DateTime), NULL, N'ITM-000909', N'V0031', N'013869', N'1         ', N'ADDITIVE SOLUTIONS PTY LTD', N'SPACEKRAFT IBC TOTES 1364 KG', N'')
INSERT [dbo].[CAPA] ([CAPAID], [CAPA_Code], [Description], [FromDepartmentID], [CreatedBy], [Priority], [StatusId], [TargetDate], [ClosureDate], [CreatedAt], [UpdatedAt], [ClosedAt], [ItemId], [ItemVarietyID], [SalesId], [Site], [Customer], [ItemName], [RejectRemarks]) VALUES (14, N'CAPA-014', N'test', 1, 1, N'MEDIUM', N'6', CAST(N'2026-05-10' AS Date), CAST(N'2026-05-10' AS Date), CAST(N'2026-05-08T15:54:47.963' AS DateTime), CAST(N'2026-05-10T18:49:19.710' AS DateTime), NULL, N'ITM-000909', N'V0031', N'013869', N'1         ', N'ADDITIVE SOLUTIONS PTY LTD', N'SPACEKRAFT IBC TOTES 1364 KG', N'')
SET IDENTITY_INSERT [dbo].[CAPA] OFF
GO
SET IDENTITY_INSERT [dbo].[CAPA_Assignments] ON 

INSERT [dbo].[CAPA_Assignments] ([AssignmentID], [CAPAID], [UserID], [IsActive], [CreatedAt], [CreatedBy]) VALUES (6, 1, 16, 1, CAST(N'2026-05-08T11:34:39.660' AS DateTime), 1)
INSERT [dbo].[CAPA_Assignments] ([AssignmentID], [CAPAID], [UserID], [IsActive], [CreatedAt], [CreatedBy]) VALUES (7, 1, 25, 1, CAST(N'2026-05-08T11:35:21.737' AS DateTime), 1)
INSERT [dbo].[CAPA_Assignments] ([AssignmentID], [CAPAID], [UserID], [IsActive], [CreatedAt], [CreatedBy]) VALUES (8, 1, 24, 1, CAST(N'2026-05-08T11:35:21.737' AS DateTime), 1)
INSERT [dbo].[CAPA_Assignments] ([AssignmentID], [CAPAID], [UserID], [IsActive], [CreatedAt], [CreatedBy]) VALUES (9, 1, 17, 1, CAST(N'2026-05-08T11:35:21.737' AS DateTime), 1)
INSERT [dbo].[CAPA_Assignments] ([AssignmentID], [CAPAID], [UserID], [IsActive], [CreatedAt], [CreatedBy]) VALUES (10, 1, 20, 1, CAST(N'2026-05-08T11:35:46.407' AS DateTime), 1)
INSERT [dbo].[CAPA_Assignments] ([AssignmentID], [CAPAID], [UserID], [IsActive], [CreatedAt], [CreatedBy]) VALUES (23, 13, 17, 1, CAST(N'2026-05-08T15:05:06.973' AS DateTime), 1)
INSERT [dbo].[CAPA_Assignments] ([AssignmentID], [CAPAID], [UserID], [IsActive], [CreatedAt], [CreatedBy]) VALUES (24, 13, 16, 1, CAST(N'2026-05-08T15:05:06.973' AS DateTime), 1)
INSERT [dbo].[CAPA_Assignments] ([AssignmentID], [CAPAID], [UserID], [IsActive], [CreatedAt], [CreatedBy]) VALUES (27, 14, 24, 1, CAST(N'2026-05-10T19:09:20.287' AS DateTime), 1)
INSERT [dbo].[CAPA_Assignments] ([AssignmentID], [CAPAID], [UserID], [IsActive], [CreatedAt], [CreatedBy]) VALUES (28, 14, 17, 1, CAST(N'2026-05-10T19:09:20.287' AS DateTime), 1)
SET IDENTITY_INSERT [dbo].[CAPA_Assignments] OFF
GO
SET IDENTITY_INSERT [dbo].[CAPAActions] ON 

INSERT [dbo].[CAPAActions] ([ActionID], [RootCauseID], [ActionCode], [ActionType], [ActionTitle], [ActionDescription], [AssignedTo], [DueDate], [Status], [Priority], [CreatedBy], [CreatedAt], [CompletedAt], [CompletionRemarks]) VALUES (3, 1, N'A-001', N'CORRECTIVE', N'Install Voltage Stabilizer', N'Install automatic voltage stabilizer to regulate power supply', 3, CAST(N'2025-05-01' AS Date), N'PENDING', N'MEDIUM', 1, CAST(N'2026-04-03T12:07:34.840' AS DateTime), NULL, NULL)
INSERT [dbo].[CAPAActions] ([ActionID], [RootCauseID], [ActionCode], [ActionType], [ActionTitle], [ActionDescription], [AssignedTo], [DueDate], [Status], [Priority], [CreatedBy], [CreatedAt], [CompletedAt], [CompletionRemarks]) VALUES (4, 1, N'A-002', N'PREVENTIVE', N'Add Voltage Monitoring System', N'Install real-time voltage monitoring system with alerts', 3, CAST(N'2025-05-15' AS Date), N'PENDING', N'MEDIUM', 1, CAST(N'2026-04-03T12:07:34.840' AS DateTime), NULL, NULL)
INSERT [dbo].[CAPAActions] ([ActionID], [RootCauseID], [ActionCode], [ActionType], [ActionTitle], [ActionDescription], [AssignedTo], [DueDate], [Status], [Priority], [CreatedBy], [CreatedAt], [CompletedAt], [CompletionRemarks]) VALUES (5, 2, N'A-003', N'CORRECTIVE', N'Retrain Operator', N'Provide comprehensive training on SOP to operator', 4, CAST(N'2025-05-05' AS Date), N'PENDING', N'MEDIUM', 1, CAST(N'2026-04-03T12:07:34.840' AS DateTime), NULL, NULL)
INSERT [dbo].[CAPAActions] ([ActionID], [RootCauseID], [ActionCode], [ActionType], [ActionTitle], [ActionDescription], [AssignedTo], [DueDate], [Status], [Priority], [CreatedBy], [CreatedAt], [CompletedAt], [CompletionRemarks]) VALUES (6, 2, N'A-004', N'PREVENTIVE', N'Implement SOP Checklist', N'Create and implement mandatory SOP checklist before operation', 4, CAST(N'2025-05-20' AS Date), N'PENDING', N'MEDIUM', 1, CAST(N'2026-04-03T12:07:34.840' AS DateTime), NULL, NULL)
SET IDENTITY_INSERT [dbo].[CAPAActions] OFF
GO
SET IDENTITY_INSERT [dbo].[CAPAAssignments] ON 

INSERT [dbo].[CAPAAssignments] ([AssignmentID], [CAPAID], [RootCauseID], [ActionID], [AssignedTo], [AssignedBy], [AssignmentDate], [ExpectedCompletionDate], [ActualCompletionDate], [ActionTaken], [ActionTakenRemarks], [IsEffective], [EffectivenessRemarks], [EffectivenessCheckedBy], [EffectivenessCheckedAt], [Status]) VALUES (4, 1, 1, 1, 3, 2, CAST(N'2026-04-03T12:09:49.907' AS DateTime), CAST(N'2025-05-01' AS Date), NULL, 0, NULL, 0, NULL, NULL, NULL, N'ASSIGNED')
INSERT [dbo].[CAPAAssignments] ([AssignmentID], [CAPAID], [RootCauseID], [ActionID], [AssignedTo], [AssignedBy], [AssignmentDate], [ExpectedCompletionDate], [ActualCompletionDate], [ActionTaken], [ActionTakenRemarks], [IsEffective], [EffectivenessRemarks], [EffectivenessCheckedBy], [EffectivenessCheckedAt], [Status]) VALUES (5, 1, 1, 2, 3, 2, CAST(N'2026-04-03T12:09:49.907' AS DateTime), CAST(N'2025-05-15' AS Date), NULL, 0, NULL, 0, NULL, NULL, NULL, N'ASSIGNED')
INSERT [dbo].[CAPAAssignments] ([AssignmentID], [CAPAID], [RootCauseID], [ActionID], [AssignedTo], [AssignedBy], [AssignmentDate], [ExpectedCompletionDate], [ActualCompletionDate], [ActionTaken], [ActionTakenRemarks], [IsEffective], [EffectivenessRemarks], [EffectivenessCheckedBy], [EffectivenessCheckedAt], [Status]) VALUES (6, 1, 2, 3, 4, 2, CAST(N'2026-04-03T12:09:49.907' AS DateTime), CAST(N'2025-05-05' AS Date), NULL, 0, NULL, 0, NULL, NULL, NULL, N'ASSIGNED')
INSERT [dbo].[CAPAAssignments] ([AssignmentID], [CAPAID], [RootCauseID], [ActionID], [AssignedTo], [AssignedBy], [AssignmentDate], [ExpectedCompletionDate], [ActualCompletionDate], [ActionTaken], [ActionTakenRemarks], [IsEffective], [EffectivenessRemarks], [EffectivenessCheckedBy], [EffectivenessCheckedAt], [Status]) VALUES (7, 1, 2, 4, 4, 2, CAST(N'2026-04-03T12:09:49.907' AS DateTime), CAST(N'2025-05-20' AS Date), NULL, 0, NULL, 0, NULL, NULL, NULL, N'ASSIGNED')
SET IDENTITY_INSERT [dbo].[CAPAAssignments] OFF
GO
SET IDENTITY_INSERT [dbo].[Categories] ON 

INSERT [dbo].[Categories] ([Id], [Name], [IsActve]) VALUES (1, N'Reduced Sugar Rice Syrup', 1)
INSERT [dbo].[Categories] ([Id], [Name], [IsActve]) VALUES (2, N'Organic Tapioca Syrup', 1)
SET IDENTITY_INSERT [dbo].[Categories] OFF
GO
SET IDENTITY_INSERT [dbo].[Certifications] ON 

INSERT [dbo].[Certifications] ([Id], [ProductId], [CertificationName], [IsActive]) VALUES (6, 1, N'ISO 9001:2015', 1)
INSERT [dbo].[Certifications] ([Id], [ProductId], [CertificationName], [IsActive]) VALUES (7, 1, N'EU & NOP Organic', 1)
INSERT [dbo].[Certifications] ([Id], [ProductId], [CertificationName], [IsActive]) VALUES (8, 1, N'BRC & HACCP', 1)
INSERT [dbo].[Certifications] ([Id], [ProductId], [CertificationName], [IsActive]) VALUES (9, 1, N'HALAL & KOSHER', 1)
SET IDENTITY_INSERT [dbo].[Certifications] OFF
GO
SET IDENTITY_INSERT [dbo].[Colors] ON 

INSERT [dbo].[Colors] ([Id], [Name], [IsActive]) VALUES (1, N'Water White', 1)
INSERT [dbo].[Colors] ([Id], [Name], [IsActive]) VALUES (2, N'White', 1)
INSERT [dbo].[Colors] ([Id], [Name], [IsActive]) VALUES (3, N'White to Creamy', 1)
SET IDENTITY_INSERT [dbo].[Colors] OFF
GO
SET IDENTITY_INSERT [dbo].[Departments] ON 

INSERT [dbo].[Departments] ([DepartmentID], [DepartmentCode], [DepartmentName], [Description], [IsActive], [CreatedAt], [UpdatedAt], [Email]) VALUES (1, N'Admin', N'Admin', N'Full Access Rights', 1, CAST(N'2026-04-03T11:17:40.063' AS DateTime), CAST(N'2026-04-03T11:17:40.063' AS DateTime), N'muhammad.ali@matcofoods.com.pk')
INSERT [dbo].[Departments] ([DepartmentID], [DepartmentCode], [DepartmentName], [Description], [IsActive], [CreatedAt], [UpdatedAt], [Email]) VALUES (2, N'PROD', N'Production', N'Manufacturing and Production Department', 1, CAST(N'2026-04-03T11:17:40.063' AS DateTime), CAST(N'2026-04-03T11:17:40.063' AS DateTime), N'muhammad.ali@matcofoods.com.pk')
INSERT [dbo].[Departments] ([DepartmentID], [DepartmentCode], [DepartmentName], [Description], [IsActive], [CreatedAt], [UpdatedAt], [Email]) VALUES (3, N'QA', N'Quality Assurance', N'Quality Control and Assurance Department', 1, CAST(N'2026-04-03T11:17:40.063' AS DateTime), CAST(N'2026-04-03T11:17:40.063' AS DateTime), N'muhammad.ali@matcofoods.com.pk')
INSERT [dbo].[Departments] ([DepartmentID], [DepartmentCode], [DepartmentName], [Description], [IsActive], [CreatedAt], [UpdatedAt], [Email]) VALUES (4, N'MAINT', N'Maintenance', N'Equipment Maintenance Department', 1, CAST(N'2026-04-03T11:17:40.063' AS DateTime), CAST(N'2026-04-03T11:17:40.063' AS DateTime), N'muhammad.ali@matcofoods.com.pk')
INSERT [dbo].[Departments] ([DepartmentID], [DepartmentCode], [DepartmentName], [Description], [IsActive], [CreatedAt], [UpdatedAt], [Email]) VALUES (5, N'HR', N'HR', N'Human Resources Department', 1, CAST(N'2026-04-03T11:17:40.063' AS DateTime), CAST(N'2026-04-03T11:17:40.063' AS DateTime), N'muhammad.ali@matcofoods.com.pk')
INSERT [dbo].[Departments] ([DepartmentID], [DepartmentCode], [DepartmentName], [Description], [IsActive], [CreatedAt], [UpdatedAt], [Email]) VALUES (6, N'SAFETY', N'Safety', N'Health and Safety Department', 1, CAST(N'2026-04-03T11:17:40.063' AS DateTime), CAST(N'2026-04-03T11:17:40.063' AS DateTime), N'muhammad.ali@matcofoods.com.pk')
INSERT [dbo].[Departments] ([DepartmentID], [DepartmentCode], [DepartmentName], [Description], [IsActive], [CreatedAt], [UpdatedAt], [Email]) VALUES (7, N'MGMT', N'Management', N'Senior Management Department', 1, CAST(N'2026-04-03T11:17:40.063' AS DateTime), CAST(N'2026-04-03T11:17:40.063' AS DateTime), N'muhammad.ali@matcofoods.com.pk')
SET IDENTITY_INSERT [dbo].[Departments] OFF
GO
SET IDENTITY_INSERT [dbo].[EmailConcernDeparts] ON 

INSERT [dbo].[EmailConcernDeparts] ([Id], [DepartmentID], [CAPAID]) VALUES (1, 1, 8)
INSERT [dbo].[EmailConcernDeparts] ([Id], [DepartmentID], [CAPAID]) VALUES (2, 2, 8)
INSERT [dbo].[EmailConcernDeparts] ([Id], [DepartmentID], [CAPAID]) VALUES (3, 3, 8)
INSERT [dbo].[EmailConcernDeparts] ([Id], [DepartmentID], [CAPAID]) VALUES (4, 1, 9)
INSERT [dbo].[EmailConcernDeparts] ([Id], [DepartmentID], [CAPAID]) VALUES (5, 4, 9)
INSERT [dbo].[EmailConcernDeparts] ([Id], [DepartmentID], [CAPAID]) VALUES (6, 2, 9)
INSERT [dbo].[EmailConcernDeparts] ([Id], [DepartmentID], [CAPAID]) VALUES (7, 3, 9)
INSERT [dbo].[EmailConcernDeparts] ([Id], [DepartmentID], [CAPAID]) VALUES (8, 1, 10)
INSERT [dbo].[EmailConcernDeparts] ([Id], [DepartmentID], [CAPAID]) VALUES (12, 5, 12)
INSERT [dbo].[EmailConcernDeparts] ([Id], [DepartmentID], [CAPAID]) VALUES (13, 4, 12)
INSERT [dbo].[EmailConcernDeparts] ([Id], [DepartmentID], [CAPAID]) VALUES (14, 6, 12)
INSERT [dbo].[EmailConcernDeparts] ([Id], [DepartmentID], [CAPAID]) VALUES (23, 1, 11)
INSERT [dbo].[EmailConcernDeparts] ([Id], [DepartmentID], [CAPAID]) VALUES (24, 2, 11)
INSERT [dbo].[EmailConcernDeparts] ([Id], [DepartmentID], [CAPAID]) VALUES (25, 3, 11)
INSERT [dbo].[EmailConcernDeparts] ([Id], [DepartmentID], [CAPAID]) VALUES (27, 7, 13)
INSERT [dbo].[EmailConcernDeparts] ([Id], [DepartmentID], [CAPAID]) VALUES (28, 3, 12)
INSERT [dbo].[EmailConcernDeparts] ([Id], [DepartmentID], [CAPAID]) VALUES (29, 1, 13)
INSERT [dbo].[EmailConcernDeparts] ([Id], [DepartmentID], [CAPAID]) VALUES (30, 1, 14)
SET IDENTITY_INSERT [dbo].[EmailConcernDeparts] OFF
GO
SET IDENTITY_INSERT [dbo].[Forms] ON 

INSERT [dbo].[Forms] ([Id], [Name], [IsActive]) VALUES (1, N'Liquid', 1)
INSERT [dbo].[Forms] ([Id], [Name], [IsActive]) VALUES (2, N'Dehydrated', 1)
SET IDENTITY_INSERT [dbo].[Forms] OFF
GO
SET IDENTITY_INSERT [dbo].[IssueName] ON 

INSERT [dbo].[IssueName] ([Id], [Name], [IssueNo]) VALUES (1, N'MR/4/08', N'Issue 1')
SET IDENTITY_INSERT [dbo].[IssueName] OFF
GO
SET IDENTITY_INSERT [dbo].[MenuItems] ON 

INSERT [dbo].[MenuItems] ([Id], [Title], [Url], [ParentId], [IsActive], [CreatedDate], [Icon]) VALUES (1, N'Dashboard', N'/', NULL, 1, CAST(N'2026-03-04T12:43:35.520' AS DateTime), N'GridIcon')
INSERT [dbo].[MenuItems] ([Id], [Title], [Url], [ParentId], [IsActive], [CreatedDate], [Icon]) VALUES (2, N'User Management', N'#', NULL, 1, CAST(N'2026-03-04T12:43:35.520' AS DateTime), N'UserCircleIcon')
INSERT [dbo].[MenuItems] ([Id], [Title], [Url], [ParentId], [IsActive], [CreatedDate], [Icon]) VALUES (3, N'Profile', N'/profile', NULL, 1, CAST(N'2026-03-04T12:43:35.520' AS DateTime), N'UserCircleIcon')
INSERT [dbo].[MenuItems] ([Id], [Title], [Url], [ParentId], [IsActive], [CreatedDate], [Icon]) VALUES (4, N'Users', N'/users', 2, 1, CAST(N'2026-03-21T20:01:13.330' AS DateTime), N'Users')
INSERT [dbo].[MenuItems] ([Id], [Title], [Url], [ParentId], [IsActive], [CreatedDate], [Icon]) VALUES (5, N'Product Specification ', N'/products', NULL, 1, CAST(N'2026-03-23T14:26:49.613' AS DateTime), N'FolderIcon')
INSERT [dbo].[MenuItems] ([Id], [Title], [Url], [ParentId], [IsActive], [CreatedDate], [Icon]) VALUES (6, N'Products', N'#', 0, 0, CAST(N'2026-03-23T14:38:29.397' AS DateTime), N'FolderIcon')
INSERT [dbo].[MenuItems] ([Id], [Title], [Url], [ParentId], [IsActive], [CreatedDate], [Icon]) VALUES (7, N'Corrective & Preventive Action', N'/capa', 0, 1, CAST(N'2026-03-23T14:41:40.813' AS DateTime), N'FolderIcon')
SET IDENTITY_INSERT [dbo].[MenuItems] OFF
GO
SET IDENTITY_INSERT [dbo].[Packaging] ON 

INSERT [dbo].[Packaging] ([Id], [ProductId], [Material], [NetWeight], [IsActive]) VALUES (5, 1, N'Jerry Cans', N'25-30', 1)
INSERT [dbo].[Packaging] ([Id], [ProductId], [Material], [NetWeight], [IsActive]) VALUES (6, 1, N'Drums', N'300', 1)
INSERT [dbo].[Packaging] ([Id], [ProductId], [Material], [NetWeight], [IsActive]) VALUES (7, 1, N'Totes', N'1364', 1)
INSERT [dbo].[Packaging] ([Id], [ProductId], [Material], [NetWeight], [IsActive]) VALUES (8, 1, N'Schutz', N'1400', 1)
SET IDENTITY_INSERT [dbo].[Packaging] OFF
GO
SET IDENTITY_INSERT [dbo].[Permissions] ON 

INSERT [dbo].[Permissions] ([Id], [Code]) VALUES (1, N'CREATE')
INSERT [dbo].[Permissions] ([Id], [Code]) VALUES (2, N'EDIT')
INSERT [dbo].[Permissions] ([Id], [Code]) VALUES (3, N'DELETE')
INSERT [dbo].[Permissions] ([Id], [Code]) VALUES (4, N'VIEW')
INSERT [dbo].[Permissions] ([Id], [Code]) VALUES (5, N'PREPARE')
INSERT [dbo].[Permissions] ([Id], [Code]) VALUES (6, N'CHECK')
INSERT [dbo].[Permissions] ([Id], [Code]) VALUES (7, N'APPROVE')
SET IDENTITY_INSERT [dbo].[Permissions] OFF
GO
SET IDENTITY_INSERT [dbo].[ProductAnalysis] ON 

INSERT [dbo].[ProductAnalysis] ([Id], [ProductId], [CategoryId], [ParameterName], [Unit], [Limits], [Status], [IsActive]) VALUES (32, 1, 1, N'Glucose (DP1)', N'%', N'9.5-16', N'--', 1)
INSERT [dbo].[ProductAnalysis] ([Id], [ProductId], [CategoryId], [ParameterName], [Unit], [Limits], [Status], [IsActive]) VALUES (33, 1, 1, N'Maltose (DP2)', N'%', N'12.5-24', NULL, 1)
INSERT [dbo].[ProductAnalysis] ([Id], [ProductId], [CategoryId], [ParameterName], [Unit], [Limits], [Status], [IsActive]) VALUES (34, 1, 1, N'Other Carbohydrates', N'%', N'65-75', NULL, 1)
INSERT [dbo].[ProductAnalysis] ([Id], [ProductId], [CategoryId], [ParameterName], [Unit], [Limits], [Status], [IsActive]) VALUES (35, 1, 1, N'Brix', N'%', N'79-81', NULL, 1)
INSERT [dbo].[ProductAnalysis] ([Id], [ProductId], [CategoryId], [ParameterName], [Unit], [Limits], [Status], [IsActive]) VALUES (36, 1, 1, N'pH', N'', N'4.5-6.0', NULL, 1)
INSERT [dbo].[ProductAnalysis] ([Id], [ProductId], [CategoryId], [ParameterName], [Unit], [Limits], [Status], [IsActive]) VALUES (37, 1, 1, N'Water Activity', N'aW', N'<0.80', NULL, 1)
INSERT [dbo].[ProductAnalysis] ([Id], [ProductId], [CategoryId], [ParameterName], [Unit], [Limits], [Status], [IsActive]) VALUES (38, 1, 1, N'Ash Contents', N'%', N'<0.3', NULL, 1)
INSERT [dbo].[ProductAnalysis] ([Id], [ProductId], [CategoryId], [ParameterName], [Unit], [Limits], [Status], [IsActive]) VALUES (39, 1, 1, N'Starch', N'', N'Negative', NULL, 1)
INSERT [dbo].[ProductAnalysis] ([Id], [ProductId], [CategoryId], [ParameterName], [Unit], [Limits], [Status], [IsActive]) VALUES (40, 1, 1, N'Protein', N'%', N'<0.5', NULL, 1)
INSERT [dbo].[ProductAnalysis] ([Id], [ProductId], [CategoryId], [ParameterName], [Unit], [Limits], [Status], [IsActive]) VALUES (41, 1, 1, N'Fat', N'%', N'<0.5', NULL, 1)
INSERT [dbo].[ProductAnalysis] ([Id], [ProductId], [CategoryId], [ParameterName], [Unit], [Limits], [Status], [IsActive]) VALUES (42, 1, 1, N'Energy', N'Kcal/100g', N'320', NULL, 1)
INSERT [dbo].[ProductAnalysis] ([Id], [ProductId], [CategoryId], [ParameterName], [Unit], [Limits], [Status], [IsActive]) VALUES (43, 1, 2, N'Lead', N'mg/Kg', N'<0.05', NULL, 1)
INSERT [dbo].[ProductAnalysis] ([Id], [ProductId], [CategoryId], [ParameterName], [Unit], [Limits], [Status], [IsActive]) VALUES (44, 1, 2, N'Arsenic', N'mg/Kg', N'<0.1', NULL, 1)
INSERT [dbo].[ProductAnalysis] ([Id], [ProductId], [CategoryId], [ParameterName], [Unit], [Limits], [Status], [IsActive]) VALUES (45, 1, 2, N'Cadmium', N'mg/Kg', N'<0.05', NULL, 1)
INSERT [dbo].[ProductAnalysis] ([Id], [ProductId], [CategoryId], [ParameterName], [Unit], [Limits], [Status], [IsActive]) VALUES (46, 1, 2, N'Mercury', N'mg/Kg', N'<0.01', NULL, 1)
INSERT [dbo].[ProductAnalysis] ([Id], [ProductId], [CategoryId], [ParameterName], [Unit], [Limits], [Status], [IsActive]) VALUES (47, 1, 3, N'Total Plate Count', N'cfu/g', N'<1000', NULL, 1)
INSERT [dbo].[ProductAnalysis] ([Id], [ProductId], [CategoryId], [ParameterName], [Unit], [Limits], [Status], [IsActive]) VALUES (48, 1, 3, N'Total Coliform', N'cfu/g', N'<100', NULL, 1)
INSERT [dbo].[ProductAnalysis] ([Id], [ProductId], [CategoryId], [ParameterName], [Unit], [Limits], [Status], [IsActive]) VALUES (49, 1, 3, N'E Coli', N'cfu/g', N'Nil', NULL, 1)
INSERT [dbo].[ProductAnalysis] ([Id], [ProductId], [CategoryId], [ParameterName], [Unit], [Limits], [Status], [IsActive]) VALUES (50, 1, 3, N'Yeast', N'cfu/g', N'<10', NULL, 1)
INSERT [dbo].[ProductAnalysis] ([Id], [ProductId], [CategoryId], [ParameterName], [Unit], [Limits], [Status], [IsActive]) VALUES (51, 1, 3, N'Mold', N'cfu/g', N'<10', NULL, 1)
INSERT [dbo].[ProductAnalysis] ([Id], [ProductId], [CategoryId], [ParameterName], [Unit], [Limits], [Status], [IsActive]) VALUES (52, 1, 3, N'Salmonella', N'cfu/25g', N'Nil', NULL, 1)
INSERT [dbo].[ProductAnalysis] ([Id], [ProductId], [CategoryId], [ParameterName], [Unit], [Limits], [Status], [IsActive]) VALUES (53, 1, 3, N'Total Plate Count', N'cfu/g', N'<1000', NULL, 1)
INSERT [dbo].[ProductAnalysis] ([Id], [ProductId], [CategoryId], [ParameterName], [Unit], [Limits], [Status], [IsActive]) VALUES (54, 1, 3, N'Total Coliform', N'cfu/g', N'<100', NULL, 1)
INSERT [dbo].[ProductAnalysis] ([Id], [ProductId], [CategoryId], [ParameterName], [Unit], [Limits], [Status], [IsActive]) VALUES (55, 1, 3, N'E Coli', N'cfu/g', N'Nil', NULL, 1)
INSERT [dbo].[ProductAnalysis] ([Id], [ProductId], [CategoryId], [ParameterName], [Unit], [Limits], [Status], [IsActive]) VALUES (56, 1, 3, N'Yeast', N'cfu/g', N'<10', NULL, 1)
INSERT [dbo].[ProductAnalysis] ([Id], [ProductId], [CategoryId], [ParameterName], [Unit], [Limits], [Status], [IsActive]) VALUES (57, 1, 3, N'Mold', N'cfu/g', N'<10', NULL, 1)
INSERT [dbo].[ProductAnalysis] ([Id], [ProductId], [CategoryId], [ParameterName], [Unit], [Limits], [Status], [IsActive]) VALUES (58, 1, 3, N'Salmonella', N'cfu/25g', N'Nil', NULL, 1)
SET IDENTITY_INSERT [dbo].[ProductAnalysis] OFF
GO
SET IDENTITY_INSERT [dbo].[Products] ON 

INSERT [dbo].[Products] ([Id], [ProductName], [ProductCode], [CategoryID], [FormID], [ColorID], [CountryOfOrigin], [Ingredients], [IngredientsDeclaration], [SuitableFor], [Additives], [Functionalities], [Description], [ShelfLife], [StorageConditions], [Uses], [CreatedAt], [IsActive]) VALUES (1, N'Conventional Tapioca Syrup 42 DE', N'MFCTS42', 1, 1, 1, N'Pakistan', N'GMO Free Tapioca Starch', N'Clarified Tapioca Syrup', N'Halal, Kosher, Vegetarian diets', N'No Additives', N'Sweeteners', N'Clean sweet flavor with light buttery and honey notes. Produced through enzymatic liquefaction and filtration.', N'18 Months', N'Store below 90°F, cool and dry place, away from sunlight', N'Drinks, ice cream, desserts, yoghurt, biscuit, pharma, bakery, snacks, confectionery', CAST(N'2026-03-26T10:34:54.897' AS DateTime), 1)
SET IDENTITY_INSERT [dbo].[Products] OFF
GO
INSERT [dbo].[RoleMenus] ([RoleId], [MenuId]) VALUES (1, 1)
INSERT [dbo].[RoleMenus] ([RoleId], [MenuId]) VALUES (1, 2)
INSERT [dbo].[RoleMenus] ([RoleId], [MenuId]) VALUES (1, 3)
INSERT [dbo].[RoleMenus] ([RoleId], [MenuId]) VALUES (1, 4)
INSERT [dbo].[RoleMenus] ([RoleId], [MenuId]) VALUES (1, 5)
INSERT [dbo].[RoleMenus] ([RoleId], [MenuId]) VALUES (1, 6)
INSERT [dbo].[RoleMenus] ([RoleId], [MenuId]) VALUES (1, 7)
INSERT [dbo].[RoleMenus] ([RoleId], [MenuId]) VALUES (2, 1)
INSERT [dbo].[RoleMenus] ([RoleId], [MenuId]) VALUES (2, 3)
GO
SET IDENTITY_INSERT [dbo].[Roles] ON 

INSERT [dbo].[Roles] ([RoleID], [RoleCode], [RoleName], [RoleLevel], [Description], [IsActive], [CreatedAt]) VALUES (1, N'ADMIN', N'System Administrator', 10, N'Full system access', 1, CAST(N'2026-04-03T11:31:24.870' AS DateTime))
INSERT [dbo].[Roles] ([RoleID], [RoleCode], [RoleName], [RoleLevel], [Description], [IsActive], [CreatedAt]) VALUES (2, N'HOD', N'Head of Department', 8, N'Department head with approval rights', 1, CAST(N'2026-04-03T11:31:24.870' AS DateTime))
INSERT [dbo].[Roles] ([RoleID], [RoleCode], [RoleName], [RoleLevel], [Description], [IsActive], [CreatedAt]) VALUES (3, N'QA_MGR', N'QA Manager', 7, N'Quality Assurance Manager', 1, CAST(N'2026-04-03T11:31:24.870' AS DateTime))
INSERT [dbo].[Roles] ([RoleID], [RoleCode], [RoleName], [RoleLevel], [Description], [IsActive], [CreatedAt]) VALUES (4, N'QA_ENG', N'QA Engineer', 5, N'Quality Assurance Engineer', 1, CAST(N'2026-04-03T11:31:24.870' AS DateTime))
INSERT [dbo].[Roles] ([RoleID], [RoleCode], [RoleName], [RoleLevel], [Description], [IsActive], [CreatedAt]) VALUES (5, N'PROD_MGR', N'Production Manager', 7, N'Production Manager', 1, CAST(N'2026-04-03T11:31:24.870' AS DateTime))
INSERT [dbo].[Roles] ([RoleID], [RoleCode], [RoleName], [RoleLevel], [Description], [IsActive], [CreatedAt]) VALUES (6, N'PROD_SUP', N'Production Supervisor', 5, N'Production Supervisor', 1, CAST(N'2026-04-03T11:31:24.870' AS DateTime))
INSERT [dbo].[Roles] ([RoleID], [RoleCode], [RoleName], [RoleLevel], [Description], [IsActive], [CreatedAt]) VALUES (7, N'PROD_OP', N'Production Operator', 3, N'Production Operator', 1, CAST(N'2026-04-03T11:31:24.870' AS DateTime))
INSERT [dbo].[Roles] ([RoleID], [RoleCode], [RoleName], [RoleLevel], [Description], [IsActive], [CreatedAt]) VALUES (8, N'MAINT_ENG', N'Maintenance Engineer', 5, N'Maintenance Engineer', 1, CAST(N'2026-04-03T11:31:24.870' AS DateTime))
INSERT [dbo].[Roles] ([RoleID], [RoleCode], [RoleName], [RoleLevel], [Description], [IsActive], [CreatedAt]) VALUES (9, N'TECHNICIAN', N'Technician', 3, N'Technician', 1, CAST(N'2026-04-03T11:31:24.870' AS DateTime))
INSERT [dbo].[Roles] ([RoleID], [RoleCode], [RoleName], [RoleLevel], [Description], [IsActive], [CreatedAt]) VALUES (10, N'HR_MGR', N'HR Manager', 7, N'Human Resources Manager', 1, CAST(N'2026-04-03T11:31:24.870' AS DateTime))
INSERT [dbo].[Roles] ([RoleID], [RoleCode], [RoleName], [RoleLevel], [Description], [IsActive], [CreatedAt]) VALUES (11, N'SAFETY_OFF', N'Safety Officer', 5, N'Safety Officer', 1, CAST(N'2026-04-03T11:31:24.870' AS DateTime))
INSERT [dbo].[Roles] ([RoleID], [RoleCode], [RoleName], [RoleLevel], [Description], [IsActive], [CreatedAt]) VALUES (12, N'HEAD_QA', N'Head of QA', 9, N'Head of Quality Assurance', 1, CAST(N'2026-04-03T11:31:24.870' AS DateTime))
INSERT [dbo].[Roles] ([RoleID], [RoleCode], [RoleName], [RoleLevel], [Description], [IsActive], [CreatedAt]) VALUES (13, N'MANAGER', N'Manager', 8, N'Department Manager', 1, CAST(N'2026-04-03T11:31:24.870' AS DateTime))
SET IDENTITY_INSERT [dbo].[Roles] OFF
GO
SET IDENTITY_INSERT [dbo].[RootCauses] ON 

INSERT [dbo].[RootCauses] ([RootCauseID], [CAPAID], [RootCauseCode], [RootCauseTitle], [RootCauseDetails], [Category], [CreatedBy], [CreatedAt], [IsVerified], [VerifiedBy], [VerifiedAt]) VALUES (1, 1, N'RC-001', N'Power Fluctuation', N'Voltage unstable ranging from 180-260V, causing motor trips', N'Equipment', 1, CAST(N'2026-04-03T11:53:16.150' AS DateTime), 0, NULL, NULL)
INSERT [dbo].[RootCauses] ([RootCauseID], [CAPAID], [RootCauseCode], [RootCauseTitle], [RootCauseDetails], [Category], [CreatedBy], [CreatedAt], [IsVerified], [VerifiedBy], [VerifiedAt]) VALUES (2, 1, N'RC-002', N'Operator Error', N'Operator did not follow standard operating procedure', N'Human Error', 1, CAST(N'2026-04-03T11:53:16.150' AS DateTime), 0, NULL, NULL)
SET IDENTITY_INSERT [dbo].[RootCauses] OFF
GO
SET IDENTITY_INSERT [dbo].[Sites] ON 

INSERT [dbo].[Sites] ([SiteID], [SiteName], [Description], [IsActive], [CreatedDate]) VALUES (1, N'RGD', N'Rice Glucose Division (RGD)', 1, CAST(N'2026-03-04T12:41:47.087' AS DateTime))
INSERT [dbo].[Sites] ([SiteID], [SiteName], [Description], [IsActive], [CreatedDate]) VALUES (2, N'MRP', N'Matco Foods Ltd.', 0, CAST(N'2026-03-04T12:41:47.087' AS DateTime))
INSERT [dbo].[Sites] ([SiteID], [SiteName], [Description], [IsActive], [CreatedDate]) VALUES (3, N'MCS', N'Matco Corn Starch', 0, CAST(N'2026-03-04T12:41:47.087' AS DateTime))
INSERT [dbo].[Sites] ([SiteID], [SiteName], [Description], [IsActive], [CreatedDate]) VALUES (4, N'FFD', N'Falak Foods Limited', 0, CAST(N'2026-03-04T12:41:47.087' AS DateTime))
INSERT [dbo].[Sites] ([SiteID], [SiteName], [Description], [IsActive], [CreatedDate]) VALUES (5, N'BPD', N'Barentz Pakistan Private Limited', 0, CAST(N'2026-03-04T12:41:47.087' AS DateTime))
SET IDENTITY_INSERT [dbo].[Sites] OFF
GO
SET IDENTITY_INSERT [dbo].[Status] ON 

INSERT [dbo].[Status] ([Id], [StatusName], [IsActive]) VALUES (1, N'OPEN', 1)
INSERT [dbo].[Status] ([Id], [StatusName], [IsActive]) VALUES (2, N'IN PROGRESS', 1)
INSERT [dbo].[Status] ([Id], [StatusName], [IsActive]) VALUES (3, N'READY FOR QC', 1)
INSERT [dbo].[Status] ([Id], [StatusName], [IsActive]) VALUES (4, N'READY FOR COA', 1)
INSERT [dbo].[Status] ([Id], [StatusName], [IsActive]) VALUES (5, N'CLOSED', 1)
INSERT [dbo].[Status] ([Id], [StatusName], [IsActive]) VALUES (6, N'ACCEPTED', 1)
INSERT [dbo].[Status] ([Id], [StatusName], [IsActive]) VALUES (7, N'REJECTED', 1)
SET IDENTITY_INSERT [dbo].[Status] OFF
GO
SET IDENTITY_INSERT [dbo].[Users] ON 

INSERT [dbo].[Users] ([UserID], [UserCode], [FullName], [Email], [PasswordHash], [PhoneNumber], [DepartmentID], [RoleID], [ReportingTo], [IsActive], [CreatedAt], [UpdatedAt], [LastLogin], [RawPassword]) VALUES (1, N'01303', N'Muhammad Ali Hussain', N'muhammad.ali@matcofoods.com.pk', N'$2b$10$5tVrlI7COxNl7BYeoFEZY.j4SyQDC2VKDqHpMbDtJ.geoK.Go/bPW', NULL, 1, 1, NULL, 1, CAST(N'2026-04-03T11:47:49.017' AS DateTime), CAST(N'2026-04-03T11:47:49.017' AS DateTime), NULL, N'12345')
INSERT [dbo].[Users] ([UserID], [UserCode], [FullName], [Email], [PasswordHash], [PhoneNumber], [DepartmentID], [RoleID], [ReportingTo], [IsActive], [CreatedAt], [UpdatedAt], [LastLogin], [RawPassword]) VALUES (16, N'EMP001', N'Ali', N'test1@company.com', NULL, NULL, 1, 7, NULL, 1, CAST(N'2026-04-03T12:04:10.983' AS DateTime), CAST(N'2026-04-03T12:04:10.983' AS DateTime), NULL, NULL)
INSERT [dbo].[Users] ([UserID], [UserCode], [FullName], [Email], [PasswordHash], [PhoneNumber], [DepartmentID], [RoleID], [ReportingTo], [IsActive], [CreatedAt], [UpdatedAt], [LastLogin], [RawPassword]) VALUES (17, N'EMP002', N'Akber', N'test2@company.com', NULL, NULL, 1, 2, NULL, 1, CAST(N'2026-04-03T12:04:10.983' AS DateTime), CAST(N'2026-04-03T12:04:10.983' AS DateTime), NULL, NULL)
INSERT [dbo].[Users] ([UserID], [UserCode], [FullName], [Email], [PasswordHash], [PhoneNumber], [DepartmentID], [RoleID], [ReportingTo], [IsActive], [CreatedAt], [UpdatedAt], [LastLogin], [RawPassword]) VALUES (18, N'EMP003', N'Kamran', N'test3@company.com', NULL, NULL, 1, 8, 2, 1, CAST(N'2026-04-03T12:04:10.983' AS DateTime), CAST(N'2026-04-03T12:04:10.983' AS DateTime), NULL, NULL)
INSERT [dbo].[Users] ([UserID], [UserCode], [FullName], [Email], [PasswordHash], [PhoneNumber], [DepartmentID], [RoleID], [ReportingTo], [IsActive], [CreatedAt], [UpdatedAt], [LastLogin], [RawPassword]) VALUES (19, N'EMP004', N'Imran', N'test4@company.com', NULL, NULL, 4, 10, NULL, 1, CAST(N'2026-04-03T12:04:10.983' AS DateTime), CAST(N'2026-04-03T12:04:10.983' AS DateTime), NULL, NULL)
INSERT [dbo].[Users] ([UserID], [UserCode], [FullName], [Email], [PasswordHash], [PhoneNumber], [DepartmentID], [RoleID], [ReportingTo], [IsActive], [CreatedAt], [UpdatedAt], [LastLogin], [RawPassword]) VALUES (20, N'EMP005', N'Dawood', N'test5@company.com', NULL, NULL, 2, 6, NULL, 1, CAST(N'2026-04-03T12:04:10.983' AS DateTime), CAST(N'2026-04-03T12:04:10.983' AS DateTime), NULL, NULL)
INSERT [dbo].[Users] ([UserID], [UserCode], [FullName], [Email], [PasswordHash], [PhoneNumber], [DepartmentID], [RoleID], [ReportingTo], [IsActive], [CreatedAt], [UpdatedAt], [LastLogin], [RawPassword]) VALUES (21, N'EMP006', N'Ibrahim', N'test6@company.com', NULL, NULL, 6, 11, NULL, 1, CAST(N'2026-04-03T12:04:10.983' AS DateTime), CAST(N'2026-04-03T12:04:10.983' AS DateTime), NULL, NULL)
INSERT [dbo].[Users] ([UserID], [UserCode], [FullName], [Email], [PasswordHash], [PhoneNumber], [DepartmentID], [RoleID], [ReportingTo], [IsActive], [CreatedAt], [UpdatedAt], [LastLogin], [RawPassword]) VALUES (22, N'EMP007', N'Muzamil', N'test7@company.com', NULL, NULL, 2, 12, NULL, 1, CAST(N'2026-04-03T12:04:10.983' AS DateTime), CAST(N'2026-04-03T12:04:10.983' AS DateTime), NULL, NULL)
INSERT [dbo].[Users] ([UserID], [UserCode], [FullName], [Email], [PasswordHash], [PhoneNumber], [DepartmentID], [RoleID], [ReportingTo], [IsActive], [CreatedAt], [UpdatedAt], [LastLogin], [RawPassword]) VALUES (23, N'EMP008', N'Umer', N'test8@company.com', NULL, NULL, 3, 9, 2, 1, CAST(N'2026-04-03T12:04:10.983' AS DateTime), CAST(N'2026-04-03T12:04:10.983' AS DateTime), NULL, NULL)
INSERT [dbo].[Users] ([UserID], [UserCode], [FullName], [Email], [PasswordHash], [PhoneNumber], [DepartmentID], [RoleID], [ReportingTo], [IsActive], [CreatedAt], [UpdatedAt], [LastLogin], [RawPassword]) VALUES (24, N'EMP009', N'Abubakr', N'test9@company.com', NULL, NULL, 1, 5, 2, 1, CAST(N'2026-04-03T12:04:10.983' AS DateTime), CAST(N'2026-04-03T12:04:10.983' AS DateTime), NULL, NULL)
INSERT [dbo].[Users] ([UserID], [UserCode], [FullName], [Email], [PasswordHash], [PhoneNumber], [DepartmentID], [RoleID], [ReportingTo], [IsActive], [CreatedAt], [UpdatedAt], [LastLogin], [RawPassword]) VALUES (25, N'EMP010', N'Abdullah', N'test10@company.com', NULL, NULL, 2, 5, 7, 1, CAST(N'2026-04-03T12:04:10.983' AS DateTime), CAST(N'2026-04-03T12:04:10.983' AS DateTime), NULL, NULL)
SET IDENTITY_INSERT [dbo].[Users] OFF
GO
SET IDENTITY_INSERT [dbo].[UserSiteAccess] ON 

INSERT [dbo].[UserSiteAccess] ([AccessID], [UserID], [SiteID], [IsActive], [GrantedDate]) VALUES (7, 16, 1, 1, CAST(N'2026-03-05T11:06:11.313' AS DateTime))
INSERT [dbo].[UserSiteAccess] ([AccessID], [UserID], [SiteID], [IsActive], [GrantedDate]) VALUES (8, 17, 1, 1, CAST(N'2026-03-05T11:06:11.313' AS DateTime))
INSERT [dbo].[UserSiteAccess] ([AccessID], [UserID], [SiteID], [IsActive], [GrantedDate]) VALUES (9, 18, 1, 1, CAST(N'2026-03-05T11:06:11.313' AS DateTime))
INSERT [dbo].[UserSiteAccess] ([AccessID], [UserID], [SiteID], [IsActive], [GrantedDate]) VALUES (10, 19, 1, 1, CAST(N'2026-03-05T11:06:11.313' AS DateTime))
INSERT [dbo].[UserSiteAccess] ([AccessID], [UserID], [SiteID], [IsActive], [GrantedDate]) VALUES (11, 20, 1, 1, CAST(N'2026-03-05T14:21:49.267' AS DateTime))
INSERT [dbo].[UserSiteAccess] ([AccessID], [UserID], [SiteID], [IsActive], [GrantedDate]) VALUES (12, 21, 1, 1, CAST(N'2026-03-05T14:26:11.340' AS DateTime))
INSERT [dbo].[UserSiteAccess] ([AccessID], [UserID], [SiteID], [IsActive], [GrantedDate]) VALUES (13, 22, 1, 1, CAST(N'2026-03-05T14:33:31.870' AS DateTime))
INSERT [dbo].[UserSiteAccess] ([AccessID], [UserID], [SiteID], [IsActive], [GrantedDate]) VALUES (26, 23, 1, 1, CAST(N'2026-04-02T11:47:53.500' AS DateTime))
INSERT [dbo].[UserSiteAccess] ([AccessID], [UserID], [SiteID], [IsActive], [GrantedDate]) VALUES (28, 1, 1, 1, CAST(N'2026-04-03T21:09:28.013' AS DateTime))
SET IDENTITY_INSERT [dbo].[UserSiteAccess] OFF
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__CAPA__0A915F13C528D7FE]    Script Date: 5/11/2026 12:07:49 AM ******/
ALTER TABLE [dbo].[CAPA] ADD UNIQUE NONCLUSTERED 
(
	[CAPA_Code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__COA__3C0AB6868E78C6C3]    Script Date: 5/11/2026 12:07:49 AM ******/
ALTER TABLE [dbo].[COA] ADD UNIQUE NONCLUSTERED 
(
	[COA_Code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__Departme__6EA8896D73686EFF]    Script Date: 5/11/2026 12:07:49 AM ******/
ALTER TABLE [dbo].[Departments] ADD UNIQUE NONCLUSTERED 
(
	[DepartmentCode] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__Roles__D62CB59CBD48DDCF]    Script Date: 5/11/2026 12:07:49 AM ******/
ALTER TABLE [dbo].[Roles] ADD UNIQUE NONCLUSTERED 
(
	[RoleCode] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__Users__1DF52D0CDE94191D]    Script Date: 5/11/2026 12:07:49 AM ******/
ALTER TABLE [dbo].[Users] ADD UNIQUE NONCLUSTERED 
(
	[UserCode] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__Users__A9D10534050A61B4]    Script Date: 5/11/2026 12:07:49 AM ******/
ALTER TABLE [dbo].[Users] ADD UNIQUE NONCLUSTERED 
(
	[Email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [UQ_UserSite]    Script Date: 5/11/2026 12:07:49 AM ******/
ALTER TABLE [dbo].[UserSiteAccess] ADD  CONSTRAINT [UQ_UserSite] UNIQUE NONCLUSTERED 
(
	[UserID] ASC,
	[SiteID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [dbo].[AnalysisCategories] ADD  CONSTRAINT [DF_AnalysisCategories_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[CAPA] ADD  DEFAULT ('MEDIUM') FOR [Priority]
GO
ALTER TABLE [dbo].[CAPA] ADD  DEFAULT ('DRAFT') FOR [StatusId]
GO
ALTER TABLE [dbo].[CAPA] ADD  DEFAULT (getdate()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[CAPA] ADD  DEFAULT (getdate()) FOR [UpdatedAt]
GO
ALTER TABLE [dbo].[CAPA_Assignments] ADD  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[CAPA_Assignments] ADD  DEFAULT (getdate()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[CAPAActions] ADD  DEFAULT ('PENDING') FOR [Status]
GO
ALTER TABLE [dbo].[CAPAActions] ADD  DEFAULT ('MEDIUM') FOR [Priority]
GO
ALTER TABLE [dbo].[CAPAActions] ADD  DEFAULT (getdate()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[CAPAAssignments] ADD  DEFAULT (getdate()) FOR [AssignmentDate]
GO
ALTER TABLE [dbo].[CAPAAssignments] ADD  DEFAULT ((0)) FOR [ActionTaken]
GO
ALTER TABLE [dbo].[CAPAAssignments] ADD  DEFAULT ((0)) FOR [IsEffective]
GO
ALTER TABLE [dbo].[CAPAAssignments] ADD  DEFAULT ('ASSIGNED') FOR [Status]
GO
ALTER TABLE [dbo].[Categories] ADD  CONSTRAINT [DF_Categories_IsActve]  DEFAULT ((1)) FOR [IsActve]
GO
ALTER TABLE [dbo].[COA] ADD  DEFAULT ('PENDING') FOR [COA_Status]
GO
ALTER TABLE [dbo].[COA] ADD  DEFAULT (getdate()) FOR [PreparedAt]
GO
ALTER TABLE [dbo].[Colors] ADD  CONSTRAINT [DF_Colors_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[Departments] ADD  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[Departments] ADD  DEFAULT (getdate()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[Departments] ADD  DEFAULT (getdate()) FOR [UpdatedAt]
GO
ALTER TABLE [dbo].[Forms] ADD  CONSTRAINT [DF_Forms_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[MenuItems] ADD  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[MenuItems] ADD  DEFAULT (getdate()) FOR [CreatedDate]
GO
ALTER TABLE [dbo].[Packaging] ADD  CONSTRAINT [DF_Packaging_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[Products] ADD  DEFAULT (getdate()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[Products] ADD  CONSTRAINT [DF_Products_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[QCTestResults] ADD  DEFAULT (getdate()) FOR [TestedAt]
GO
ALTER TABLE [dbo].[Roles] ADD  DEFAULT ((1)) FOR [RoleLevel]
GO
ALTER TABLE [dbo].[Roles] ADD  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[Roles] ADD  DEFAULT (getdate()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[RootCauses] ADD  DEFAULT (getdate()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[RootCauses] ADD  DEFAULT ((0)) FOR [IsVerified]
GO
ALTER TABLE [dbo].[Sites] ADD  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[Sites] ADD  DEFAULT (getdate()) FOR [CreatedDate]
GO
ALTER TABLE [dbo].[Status] ADD  CONSTRAINT [DF_Status_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[Users] ADD  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[Users] ADD  DEFAULT (getdate()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[Users] ADD  DEFAULT (getdate()) FOR [UpdatedAt]
GO
ALTER TABLE [dbo].[UserSiteAccess] ADD  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[UserSiteAccess] ADD  DEFAULT (getdate()) FOR [GrantedDate]
GO
ALTER TABLE [dbo].[CAPA]  WITH CHECK ADD FOREIGN KEY([CreatedBy])
REFERENCES [dbo].[Users] ([UserID])
GO
ALTER TABLE [dbo].[CAPA]  WITH CHECK ADD FOREIGN KEY([FromDepartmentID])
REFERENCES [dbo].[Departments] ([DepartmentID])
GO
ALTER TABLE [dbo].[CAPAActions]  WITH CHECK ADD FOREIGN KEY([CreatedBy])
REFERENCES [dbo].[Users] ([UserID])
GO
ALTER TABLE [dbo].[CAPAActions]  WITH CHECK ADD FOREIGN KEY([RootCauseID])
REFERENCES [dbo].[RootCauses] ([RootCauseID])
GO
ALTER TABLE [dbo].[CAPAAssignments]  WITH CHECK ADD FOREIGN KEY([CAPAID])
REFERENCES [dbo].[CAPA] ([CAPAID])
GO
ALTER TABLE [dbo].[CAPAAssignments]  WITH CHECK ADD FOREIGN KEY([EffectivenessCheckedBy])
REFERENCES [dbo].[Users] ([UserID])
GO
ALTER TABLE [dbo].[CAPAAssignments]  WITH CHECK ADD FOREIGN KEY([RootCauseID])
REFERENCES [dbo].[RootCauses] ([RootCauseID])
GO
ALTER TABLE [dbo].[COA]  WITH CHECK ADD FOREIGN KEY([ApprovedBy])
REFERENCES [dbo].[Users] ([UserID])
GO
ALTER TABLE [dbo].[COA]  WITH CHECK ADD FOREIGN KEY([CAPAID])
REFERENCES [dbo].[CAPA] ([CAPAID])
GO
ALTER TABLE [dbo].[COA]  WITH CHECK ADD FOREIGN KEY([CheckedBy])
REFERENCES [dbo].[Users] ([UserID])
GO
ALTER TABLE [dbo].[COA]  WITH CHECK ADD FOREIGN KEY([PreparedBy])
REFERENCES [dbo].[Users] ([UserID])
GO
ALTER TABLE [dbo].[COATestResults]  WITH CHECK ADD FOREIGN KEY([COAID])
REFERENCES [dbo].[COA] ([COAID])
GO
ALTER TABLE [dbo].[ProductAnalysis]  WITH CHECK ADD FOREIGN KEY([CategoryId])
REFERENCES [dbo].[AnalysisCategories] ([Id])
GO
ALTER TABLE [dbo].[QCTestResults]  WITH CHECK ADD FOREIGN KEY([ActionID])
REFERENCES [dbo].[CAPAActions] ([ActionID])
GO
ALTER TABLE [dbo].[QCTestResults]  WITH CHECK ADD FOREIGN KEY([CAPAID])
REFERENCES [dbo].[CAPA] ([CAPAID])
GO
ALTER TABLE [dbo].[QCTestResults]  WITH CHECK ADD FOREIGN KEY([TestedBy])
REFERENCES [dbo].[Users] ([UserID])
GO
ALTER TABLE [dbo].[QCTestResults]  WITH CHECK ADD FOREIGN KEY([VerifiedBy])
REFERENCES [dbo].[Users] ([UserID])
GO
ALTER TABLE [dbo].[RootCauses]  WITH CHECK ADD FOREIGN KEY([CAPAID])
REFERENCES [dbo].[CAPA] ([CAPAID])
GO
ALTER TABLE [dbo].[RootCauses]  WITH CHECK ADD FOREIGN KEY([CreatedBy])
REFERENCES [dbo].[Users] ([UserID])
GO
ALTER TABLE [dbo].[RootCauses]  WITH CHECK ADD FOREIGN KEY([VerifiedBy])
REFERENCES [dbo].[Users] ([UserID])
GO
ALTER TABLE [dbo].[Users]  WITH CHECK ADD FOREIGN KEY([DepartmentID])
REFERENCES [dbo].[Departments] ([DepartmentID])
GO
ALTER TABLE [dbo].[Users]  WITH CHECK ADD FOREIGN KEY([RoleID])
REFERENCES [dbo].[Roles] ([RoleID])
GO
ALTER TABLE [dbo].[UserSiteAccess]  WITH CHECK ADD  CONSTRAINT [FK_UserSiteAccess_Site] FOREIGN KEY([SiteID])
REFERENCES [dbo].[Sites] ([SiteID])
GO
ALTER TABLE [dbo].[UserSiteAccess] CHECK CONSTRAINT [FK_UserSiteAccess_Site]
GO
ALTER TABLE [dbo].[CAPAActions]  WITH CHECK ADD CHECK  (([ActionType]='PREVENTIVE' OR [ActionType]='CORRECTIVE'))
GO
/****** Object:  StoredProcedure [dbo].[deleteUser]    Script Date: 5/11/2026 12:07:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[deleteUser]
(@UserID int)
AS

BEGIN
    IF NOT EXISTS (SELECT * FROM [Users]  WHERE UserID =@UserID )
BEGIN
    Select 'User not founds'
END
ELSE
   BEGIN
     
	 delete from  [Users] where UserID=@UserID
	 delete  from [UserRoles]  where UserID=@UserID
	 delete  from [UserSiteAccess] where UserID=@UserID

	  Select 'User has been deleted' 

   END
END
GO
/****** Object:  StoredProcedure [dbo].[GetEmailConcernDepartByCAPAID]    Script Date: 5/11/2026 12:07:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetEmailConcernDepartByCAPAID]
(@CAPAID int)

AS
BEGIN

select EmailConcernDeparts.[DepartmentId] as Id,[DepartmentName] from EmailConcernDeparts inner join
Departments on EmailConcernDeparts.DepartmentID=Departments.DepartmentID
where CAPAID=@CAPAID
END
GO
/****** Object:  StoredProcedure [dbo].[sp_AcceptOrRecjectCAPA]    Script Date: 5/11/2026 12:07:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_AcceptOrRecjectCAPA]
    @CAPAID INT,
    @TargetDate DATETIME = NULL,
    @ClosureDate DATETIME = NULL,
    @StatusId NVARCHAR(10),
    @CreatedBy INT,
    @RejectRemarks NVARCHAR(MAX)
AS
BEGIN
    SET NOCOUNT ON;

    if(@StatusId ='accept')
    begin
    
    -- Update CAPA main status
    UPDATE [TQMS].[dbo].[CAPA]
    SET StatusId =( CASE 
                  WHEN @StatusId = 'accept' THEN 6
                  WHEN @StatusId = 'reject' THEN 7
                  ELSE StatusId
               END),
        UpdatedAt = GETDATE(),
        TargetDate=@TargetDate,
        ClosureDate=@ClosureDate,
        RejectRemarks=@RejectRemarks
    WHERE CAPAID = @CAPAID

    end

    else

    begin

        delete from [CAPA_Assignments]
    where CAPAID=@CAPAID
    
    -- Update CAPA main status
    UPDATE [TQMS].[dbo].[CAPA]
    SET StatusId =( CASE 
                  WHEN @StatusId = 'accept' THEN 6
                  WHEN @StatusId = 'reject' THEN 7
                  ELSE StatusId
               END),
        UpdatedAt = GETDATE(),
        TargetDate='',
        ClosureDate='',
        RejectRemarks=@RejectRemarks
    WHERE CAPAID = @CAPAID


    end


;

    SELECT 'SUCCESS' AS Message;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_AddAction]    Script Date: 5/11/2026 12:07:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- 3. Add Action for Root Cause
CREATE PROCEDURE [dbo].[sp_AddAction]
    @RootCauseID INT,
    @ActionType NVARCHAR(20),
    @ActionTitle NVARCHAR(255),
    @ActionDescription NVARCHAR(MAX),
    @AssignedTo INT,
    @DueDate DATE,
    @CreatedBy INT,
    @Priority NVARCHAR(20) = 'MEDIUM'
AS
BEGIN
    DECLARE @ActionCode NVARCHAR(50);
    DECLARE @CAPAID INT;
    
    SELECT @CAPAID = CAPAID FROM RootCauses WHERE RootCauseID = @RootCauseID;
    
    DECLARE @ActionCount INT;
    SELECT @ActionCount = COUNT(*) + 1 FROM CAPAActions WHERE RootCauseID = @RootCauseID;
    SET @ActionCode = 'A-' + RIGHT('000' + CAST(@ActionCount AS VARCHAR), 3);
    
    INSERT INTO CAPAActions (RootCauseID, ActionCode, ActionType, ActionTitle, ActionDescription, AssignedTo, DueDate, CreatedBy, Priority)
    VALUES (@RootCauseID, @ActionCode, @ActionType, @ActionTitle, @ActionDescription, @AssignedTo, @DueDate, @CreatedBy, @Priority);
    
    DECLARE @ActionID INT = SCOPE_IDENTITY();
    
    -- Create assignment record
    INSERT INTO CAPAAssignments (CAPAID, RootCauseID, ActionID, AssignedTo, AssignedBy, ExpectedCompletionDate)
    VALUES (@CAPAID, @RootCauseID, @ActionID, @AssignedTo, @CreatedBy, @DueDate);
    
    SELECT @ActionID AS ActionID, @ActionCode AS ActionCode;
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_AddRootCause]    Script Date: 5/11/2026 12:07:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- 2. Add Root Cause with Auto Code
CREATE PROCEDURE [dbo].[sp_AddRootCause]
    @CAPAID INT,
    @RootCauseTitle NVARCHAR(255),
    @RootCauseDetails NVARCHAR(MAX),
    @Category NVARCHAR(100),
    @CreatedBy INT
AS
BEGIN
    DECLARE @RootCauseCode NVARCHAR(50);
    DECLARE @RootCauseCount INT;
    
    SELECT @RootCauseCount = COUNT(*) + 1 FROM RootCauses WHERE CAPAID = @CAPAID;
    SET @RootCauseCode = 'RC-' + RIGHT('000' + CAST(@RootCauseCount AS VARCHAR), 3);
    
    INSERT INTO RootCauses (CAPAID, RootCauseCode, RootCauseTitle, RootCauseDetails, Category, CreatedBy)
    VALUES (@CAPAID, @RootCauseCode, @RootCauseTitle, @RootCauseDetails, @Category, @CreatedBy);
    
    SELECT SCOPE_IDENTITY() AS RootCauseID, @RootCauseCode AS RootCauseCode;
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_AssignCAPA_MultipleUsers]    Script Date: 5/11/2026 12:07:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_AssignCAPA_MultipleUsers]
    @CAPAID INT,
    @UserIDs NVARCHAR(MAX), -- comma separated: '1,2,3'
    @CreatedBy INT
   
AS
BEGIN
    SET NOCOUNT ON;


    -- Convert CSV to table
    DECLARE @Users TABLE (UserID INT);

    INSERT INTO @Users(UserID)
   SELECT [Param] FROM dbo.fun_splitstring(@UserIDs)

    -- Validate users
    IF EXISTS (
        SELECT 1
        FROM @Users u
        LEFT JOIN [TQMS].[dbo].[Users] us ON u.UserID = us.UserID
        WHERE us.UserID IS NULL OR us.IsActive = 0
    )
    BEGIN
        RAISERROR('Invalid user in list', 16, 1);
        RETURN;
    END


    delete from [CAPA_Assignments]
    where CAPAID=@CAPAID and UserID in ( SELECT [Param] FROM dbo.fun_splitstring(@UserIDs))
    
    -- Insert assignments
    INSERT INTO [CAPA_Assignments]
    (CAPAID, UserID ,CreatedBy)
    SELECT 
        @CAPAID,
        UserID,
        @CreatedBy
        
    FROM @Users;


    SELECT 'SUCCESS' AS Message;
END

--exec [sp_AssignCAPA_MultipleUsers] 1,'1,2,3' ,1
GO
/****** Object:  StoredProcedure [dbo].[sp_AssignUser]    Script Date: 5/11/2026 12:07:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- 4. Assign Users (HOD)
CREATE PROCEDURE [dbo].[sp_AssignUser]
    @AssignmentID VARCHAR(20),
    @CAPAID VARCHAR(20),
    @RootCauseID VARCHAR(20),
    @AssignedTo INT,
    @AssignedToName NVARCHAR(100),
    @AssignedBy INT,
    @AssignedByName NVARCHAR(100)
AS
BEGIN
    INSERT INTO Assignments (AssignmentID, CAPAID, RootCauseID, AssignedTo, AssignedToName, AssignedBy, AssignedByName)
    VALUES (@AssignmentID, @CAPAID, @RootCauseID, @AssignedTo, @AssignedToName, @AssignedBy, @AssignedByName);
    
    SELECT * FROM Assignments WHERE AssignmentID = @AssignmentID;
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_CAPA_Delete]    Script Date: 5/11/2026 12:07:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[sp_CAPA_Delete]
    @CAPAID INT
AS
BEGIN
    DELETE FROM CAPA WHERE CAPAID = @CAPAID
END
GO
/****** Object:  StoredProcedure [dbo].[sp_Certifications_Delete]    Script Date: 5/11/2026 12:07:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_Certifications_Delete]
    @Id INT
AS
BEGIN
    DELETE FROM Certifications WHERE Id = @Id
END
GO
/****** Object:  StoredProcedure [dbo].[sp_Certifications_GetAllByProductId]    Script Date: 5/11/2026 12:07:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_Certifications_GetAllByProductId]
(@ProductId int)
AS
BEGIN
    SELECT Certifications.Id, ProductId, CertificationName, Certifications.IsActive ,Products.ProductName
    FROM Certifications inner join  Products
    on Products.Id=Certifications.ProductId 
    
    where ProductId=@ProductId
END


--exec  [sp_Certifications_GetAllByProductId] 1
GO
/****** Object:  StoredProcedure [dbo].[sp_Certifications_Insert]    Script Date: 5/11/2026 12:07:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_Certifications_Insert]
    @ProductId INT,
    @CertificationName NVARCHAR(200),
    @IsActive BIT
AS
BEGIN
    INSERT INTO Certifications (ProductId, CertificationName, IsActive)
    VALUES (@ProductId, @CertificationName, @IsActive)

    SELECT SCOPE_IDENTITY() AS Id
END
GO
/****** Object:  StoredProcedure [dbo].[sp_Certifications_Update]    Script Date: 5/11/2026 12:07:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_Certifications_Update]
    @Id INT,
    @ProductId INT,
    @CertificationName NVARCHAR(200),
    @IsActive BIT
AS
BEGIN
    UPDATE Certifications
    SET 
        ProductId = @ProductId,
        CertificationName = @CertificationName,
        IsActive = @IsActive
    WHERE Id = @Id
END
GO
/****** Object:  StoredProcedure [dbo].[sp_CheckCOA]    Script Date: 5/11/2026 12:07:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- 8. Check COA (QA Manager)
CREATE PROCEDURE [dbo].[sp_CheckCOA]
    @COAID INT,
    @CheckedBy INT,
    @OverallRemarks NVARCHAR(MAX) = NULL
AS
BEGIN
    UPDATE COA 
    SET CheckedBy = @CheckedBy,
        CheckedAt = GETDATE(),
        COA_Status = 'CHECKED',
        OverallRemarks = @OverallRemarks
    WHERE COAID = @COAID;
    
    SELECT 'COA Checked' AS Message;
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_CompleteAction]    Script Date: 5/11/2026 12:07:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- 4. Complete Action (User)
CREATE PROCEDURE [dbo].[sp_CompleteAction]
    @AssignmentID INT,
    @ActionTaken BIT,
    @Remarks NVARCHAR(MAX),
    @CompletedBy INT
AS
BEGIN
    UPDATE CAPAAssignments 
    SET ActionTaken = @ActionTaken,
        ActionTakenRemarks = @Remarks,
        ActualCompletionDate = GETDATE(),
        Status = CASE WHEN @ActionTaken = 1 THEN 'COMPLETED' ELSE 'REJECTED' END
    WHERE AssignmentID = @AssignmentID;
    
    UPDATE CAPAActions 
    SET Status = CASE WHEN @ActionTaken = 1 THEN 'COMPLETED' ELSE 'REJECTED' END,
        CompletedAt = GETDATE(),
        CompletionRemarks = @Remarks
    WHERE ActionID = (SELECT ActionID FROM CAPAAssignments WHERE AssignmentID = @AssignmentID);
    
    SELECT 'Action Completed' AS Message;
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_CreateCAPA]    Script Date: 5/11/2026 12:07:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_CreateCAPA]
    @Description NVARCHAR(MAX),
    @FromDepartmentID INT,
    @ToDepartmentID NVARCHAR(20),
    @CreatedBy INT,
    @Priority NVARCHAR(20) = 'MEDIUM',
    @TargetDate DATE = NULL,
    @ItemId NVARCHAR(50),
    @ItemVarietyID NVARCHAR(50),
    @Site NVARCHAR(10),
    @SalesId  NVARCHAR(50),
    @Customer NVARCHAR(50),
    @ItemName NVARCHAR(50)
  
AS
BEGIN
    DECLARE @CAPAID INT;
    DECLARE @CAPA_Code NVARCHAR(50);
    
    SELECT @CAPA_Code = 'CAPA-' + RIGHT('000' + CAST(ISNULL(MAX(CAPAID), 0) + 1 AS VARCHAR), 3)
    FROM CAPA;
    
    INSERT INTO CAPA (CAPA_Code, Description, FromDepartmentID, CreatedBy, Priority, StatusId, TargetDate, CreatedAt,ItemId,ItemVarietyID,Customer,SalesId,Site,ItemName)
    VALUES (@CAPA_Code, @Description, @FromDepartmentID, @CreatedBy, @Priority, 1, @TargetDate, GETDATE(),@ItemId,@ItemVarietyID,@Customer,@SalesId,@Site,@ItemName);
    
    SET @CAPAID = SCOPE_IDENTITY();
    
    insert into  EmailConcernDeparts([CAPAID],[DepartmentID])
    
    select @CAPAID, DepartmentID from (
    select [Param] from  dbo.fun_splitstring(@ToDepartmentID) ) as tb
    inner join Departments on LTRIM(RTRIM([Param]))=LTRIM(RTRIM(DepartmentID))
    
    
    
    SELECT @CAPAID AS CAPAID, @CAPA_Code AS CAPA_Code;
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_DeleteAssignCAPAUser]    Script Date: 5/11/2026 12:07:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create PROCEDURE [dbo].[sp_DeleteAssignCAPAUser]
    @CAPAID INT,
    @AssignmentID INT
   
   
AS
BEGIN
    SET NOCOUNT ON;


    DELETE FROM CAPA_Assignments WHERE CAPAID=@CAPAID and AssignmentID=@AssignmentID


    SELECT 'SUCCESS' AS Message;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_GetAll_AnalysisCategories]    Script Date: 5/11/2026 12:07:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[sp_GetAll_AnalysisCategories]
as
begin
SELECT  [Id]
      ,[CategoryName]
      ,[IsActive]
  FROM [TQMS].[dbo].[AnalysisCategories]
  where IsActive=1
  end
GO
/****** Object:  StoredProcedure [dbo].[sp_GetAllCapaAssignUsers]    Script Date: 5/11/2026 12:07:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[sp_GetAllCapaAssignUsers]
 
as

 SELECT [Users].UserID, FullName ,DepartmentName,RoleName
    FROM [Users] inner join Departments
    on Departments.DepartmentID=[Users].DepartmentID
    inner join Roles on Roles.RoleID=[Users].RoleID
    inner join [CAPA_Assignments] on [CAPA_Assignments].UserID = [Users].UserID
    WHERE [Users].IsActive = 1 and [CAPA_Assignments].IsActive=1
    ORDER BY FullName
GO
/****** Object:  StoredProcedure [dbo].[sp_GetAllCapaAssignUsersByCAPAID]    Script Date: 5/11/2026 12:07:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[sp_GetAllCapaAssignUsersByCAPAID]
 ( @CAPAID INT)
as

 SELECT [CAPA_Assignments].AssignmentID, [Users].UserID, FullName ,DepartmentName,RoleName
    FROM [Users] inner join Departments
    on Departments.DepartmentID=[Users].DepartmentID
    inner join Roles on Roles.RoleID=[Users].RoleID
    inner join [CAPA_Assignments] on [CAPA_Assignments].UserID = [Users].UserID
    WHERE [Users].IsActive = 1 and [CAPA_Assignments].IsActive=1
    and CAPAID=@CAPAID
    ORDER BY FullName
GO
/****** Object:  StoredProcedure [dbo].[sp_GetAllCAPAs]    Script Date: 5/11/2026 12:07:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- 10. Get All CAPAs
CREATE PROCEDURE [dbo].[sp_GetAllCAPAs]
AS
BEGIN
    SELECT * ,(select top 1 StatusName from [Status]  where id=CAPA.StatusId) as 'Status'  FROM CAPA 
    

    
    ORDER BY CreatedAt DESC;
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_GetAllCategories]    Script Date: 5/11/2026 12:07:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_GetAllCategories]
AS
BEGIN
	select Id,Name
      
  FROM [Categories]
  
  where [IsActve]=1
END
GO
/****** Object:  StoredProcedure [dbo].[sp_GetAllColors]    Script Date: 5/11/2026 12:07:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create PROCEDURE [dbo].[sp_GetAllColors]
AS
BEGIN
	select [Id],[Name]
      
  FROM [Colors]
  
  where IsActive=1
END
GO
/****** Object:  StoredProcedure [dbo].[sp_GetAllDepartment]    Script Date: 5/11/2026 12:07:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create PROCEDURE [dbo].[sp_GetAllDepartment]
AS
BEGIN
	SELECT [DepartmentId]as Id, [DepartmentName] FROM Departments  where IsActive=1
END
GO
/****** Object:  StoredProcedure [dbo].[sp_GetAllForms]    Script Date: 5/11/2026 12:07:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create PROCEDURE [dbo].[sp_GetAllForms]
AS
BEGIN
	select [Id],[Name]
      
  FROM [Forms]
  
  
  where IsActive=1
END
GO
/****** Object:  StoredProcedure [dbo].[sp_GetAllowedUrls]    Script Date: 5/11/2026 12:07:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_GetAllowedUrls]
    @RoleId INT
AS
BEGIN
    SELECT Url
    FROM [MenuItems] inner  join RoleMenus on  RoleMenus.MenuId=[MenuItems].Id
    WHERE RoleId = @RoleId
      AND IsActive = 1
      AND Url <> '#';
END
GO
/****** Object:  StoredProcedure [dbo].[sp_GetAllRoles]    Script Date: 5/11/2026 12:07:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_GetAllRoles]
AS
BEGIN
	select [RoleID] as Id
         ,[RoleName]
  FROM [Roles]  where IsActive=1
END
GO
/****** Object:  StoredProcedure [dbo].[sp_GetAllSites]    Script Date: 5/11/2026 12:07:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_GetAllSites]
AS
BEGIN
	SELECT [SiteID] as Id,
          [SiteName]
         ,[Description]
  FROM [Sites]  where IsActive=1
END
GO
/****** Object:  StoredProcedure [dbo].[sp_GetAllStatus]    Script Date: 5/11/2026 12:07:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create PROCEDURE [dbo].[sp_GetAllStatus]
AS
BEGIN
	select  Id
         ,[StatusName]
  FROM [Status]  where IsActive=1
END
GO
/****** Object:  StoredProcedure [dbo].[sp_GetAllUsers]    Script Date: 5/11/2026 12:07:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create procedure [dbo].[sp_GetAllUsers]
as

 SELECT UserID, FullName ,DepartmentName,RoleName
    FROM [Users] inner join Departments
    on Departments.DepartmentID=[Users].DepartmentID
    inner join Roles on Roles.RoleID=[Users].RoleID
    WHERE [Users].IsActive = 1
    ORDER BY FullName
GO
/****** Object:  StoredProcedure [dbo].[sp_GetCAPADetails]    Script Date: 5/11/2026 12:07:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- 11. Get Complete CAPA Details with all related data
CREATE PROCEDURE [dbo].[sp_GetCAPADetails]
    @CAPAID INT
AS
BEGIN
    -- CAPA Header with Department and Creator
    SELECT 
        c.*,(select top 1 StatusName from [Status]  where id=c.StatusId) as 'Status',
        d.DepartmentName,
        u_created.FullName AS CreatedByName,
        
(SELECT 
    STUFF((
        SELECT DISTINCT ', ' + u.FullName
        FROM CAPA_Assignments ca
        INNER JOIN Users u ON u.UserID = ca.UserID
        WHERE ca.CAPAID = @CAPAID
        FOR XML PATH(''), TYPE
    ).value('.', 'NVARCHAR(MAX)'), 1, 2, '')) AS AssignedToName

        --,
      --  u_assigned.FullName AS AssignedToName,
       -- r.RoleName AS CreatorRole
    FROM CAPA c
    LEFT JOIN Departments d ON c.FromDepartmentID = d.DepartmentID
    LEFT JOIN Users u_created ON c.CreatedBy = u_created.UserID
    --LEFT JOIN Users u_assigned ON c.AssignedTo = u_assigned.UserID
    --LEFT JOIN Roles r ON u_created.RoleID = r.RoleID
   WHERE c.CAPAID = @CAPAID;
    
    -- Root Causes with Actions
    SELECT 
        rc.RootCauseID, rc.RootCauseCode, rc.RootCauseTitle, rc.RootCauseDetails, rc.Category,
        a.ActionID, a.ActionCode, a.ActionType, a.ActionTitle, a.ActionDescription, a.Status AS ActionStatus,
        ass.AssignmentID, ass.ActionTaken, ass.IsEffective, ass.Status AS AssignmentStatus,
        u_assigned.FullName AS AssignedToName,
        u_assigned_by.FullName AS AssignedByName,
        u_completed.FullName AS CompletedByName
    FROM RootCauses rc
    LEFT JOIN CAPAActions a ON rc.RootCauseID = a.RootCauseID
    LEFT JOIN CAPAAssignments ass ON a.ActionID = ass.ActionID
    LEFT JOIN Users u_assigned ON ass.AssignedTo = u_assigned.UserID
    LEFT JOIN Users u_assigned_by ON ass.AssignedBy = u_assigned_by.UserID
    LEFT JOIN Users u_completed ON a.AssignedTo = u_completed.UserID
    WHERE rc.CAPAID = @CAPAID;
    
    -- QC Test Results
    SELECT 
        qr.*,
        u_tested.FullName AS TestedByName,
        u_verified.FullName AS VerifiedByName
    FROM QCTestResults qr
    LEFT JOIN Users u_tested ON qr.TestedBy = u_tested.UserID
    LEFT JOIN Users u_verified ON qr.VerifiedBy = u_verified.UserID
    WHERE qr.CAPAID = @CAPAID;
    
    -- COA Details with Approvers
    SELECT 
        coa.*,
        u_prepared.FullName AS PreparedByName,
        u_checked.FullName AS CheckedByName,
        u_approved.FullName AS ApprovedByName
    FROM COA coa
    LEFT JOIN Users u_prepared ON coa.PreparedBy = u_prepared.UserID
    LEFT JOIN Users u_checked ON coa.CheckedBy = u_checked.UserID
    LEFT JOIN Users u_approved ON coa.ApprovedBy = u_approved.UserID
    WHERE coa.CAPAID = @CAPAID;
    
    -- COA Test Results
    SELECT * FROM COATestResults WHERE COAID IN (SELECT COAID FROM COA WHERE CAPAID = @CAPAID);
END;


-- exec [dbo].[sp_GetCAPADetails] 1
GO
/****** Object:  StoredProcedure [dbo].[sp_GetCAPADetailsWithStatus]    Script Date: 5/11/2026 12:07:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE  [dbo].[sp_GetCAPADetailsWithStatus]
    (@status NVARCHAR(50))
as
BEGIN


SELECT c.*, u.FullName as CreatedByName,d.DepartmentName ,(select top 1 StatusName from [Status]  where id=c.StatusId) as 'Status'
      FROM CAPA c
      LEFT JOIN Users u ON c.CreatedBy = u.UserID
      inner join Departments d on u.DepartmentID=d.DepartmentID
      WHERE c.StatusId =ISNULL(@status,c.StatusId)
      ORDER BY c.CreatedAt DESC

END


--exec sp_GetCAPADetailsWithStatus null
GO
/****** Object:  StoredProcedure [dbo].[sp_GetCAPAList]    Script Date: 5/11/2026 12:07:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_GetCAPAList]
(
    @Search NVARCHAR(100) = '',
    @Status NVARCHAR(50) = '',
    @PageNo INT = 1,
    @PageSize INT = 20
)
AS
BEGIN

    SET NOCOUNT ON;
       SET @Search = LTRIM(RTRIM(@Search))
       SET @Status = LTRIM(RTRIM(@Status))

    -----------------------------------
    -- Total Records
    -----------------------------------
    SELECT COUNT(*) AS TotalRecords
    FROM CAPA
    WHERE
    (
        @Search = ''
        OR CAPA_Code LIKE '%' + @Search + '%'
        OR Customer LIKE '%' + @Search + '%'
        OR ItemName LIKE '%' + @Search + '%'
    )
    AND
    (
        @Status = ''
        OR StatusId = @Status
    );

    -----------------------------------
    -- Paginated Records
    -----------------------------------
    SELECT * ,(select top 1 StatusName from [Status]  where id=CAPA.StatusId) as 'Status' ,
    (select top 1 FullName  from Users  where UserID=CAPA.CreatedBy)   as CreatedByName
    FROM CAPA
    WHERE
    (
        @Search = ''
        OR CAPA_Code LIKE '%' + @Search + '%'
        OR Customer LIKE '%' + @Search + '%'
        OR ItemName LIKE '%' + @Search + '%'
    )
    AND
    (
        @Status = ''
        OR StatusId = @Status
    )

    ORDER BY CAPAID DESC

    OFFSET (@PageNo - 1) * @PageSize ROWS
    FETCH NEXT @PageSize ROWS ONLY;

END
GO
/****** Object:  StoredProcedure [dbo].[sp_GetCAPAWorkflowTimeline]    Script Date: 5/11/2026 12:07:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- 13. Get CAPA Workflow Timeline
CREATE PROCEDURE [dbo].[sp_GetCAPAWorkflowTimeline]
    @CAPAID INT
AS
BEGIN
    -- Create temporary table for timeline
    CREATE TABLE #Timeline (
        EventID INT IDENTITY(1,1),
        EventDate DATETIME,
        EventType NVARCHAR(50),
        EventDescription NVARCHAR(MAX),
        PerformedBy NVARCHAR(255),
        Role NVARCHAR(100)
    );
    
    -- CAPA Creation
    INSERT INTO #Timeline (EventDate, EventType, EventDescription, PerformedBy, Role)
    SELECT 
        c.CreatedAt,
        'CAPA_CREATED',
        'CAPA ' + c.CAPA_Code + ' was created',
        u.FullName,
        r.RoleName
    FROM CAPA c
    LEFT JOIN Users u ON c.CreatedBy = u.UserID
    LEFT JOIN Roles r ON u.RoleID = r.RoleID
    WHERE c.CAPAID = @CAPAID;
    
    -- Root Causes Added
    INSERT INTO #Timeline (EventDate, EventType, EventDescription, PerformedBy, Role)
    SELECT 
        rc.CreatedAt,
        'ROOT_CAUSE_ADDED',
        'Root cause "' + rc.RootCauseTitle + '" was identified',
        u.FullName,
        r.RoleName
    FROM RootCauses rc
    LEFT JOIN Users u ON rc.CreatedBy = u.UserID
    LEFT JOIN Roles r ON u.RoleID = r.RoleID
    WHERE rc.CAPAID = @CAPAID;
    
    -- Actions Assigned
    INSERT INTO #Timeline (EventDate, EventType, EventDescription, PerformedBy, Role)
    SELECT 
        ass.AssignmentDate,
        'ACTION_ASSIGNED',
        'Action "' + a.ActionTitle + '" assigned to ' + u_assigned.FullName,
        u_assigned_by.FullName,
        r.RoleName
    FROM CAPAAssignments ass
    JOIN CAPAActions a ON ass.ActionID = a.ActionID
    LEFT JOIN Users u_assigned ON ass.AssignedTo = u_assigned.UserID
    LEFT JOIN Users u_assigned_by ON ass.AssignedBy = u_assigned_by.UserID
    LEFT JOIN Roles r ON u_assigned_by.RoleID = r.RoleID
    WHERE ass.CAPAID = @CAPAID;
    
    -- Actions Completed
    INSERT INTO #Timeline (EventDate, EventType, EventDescription, PerformedBy, Role)
    SELECT 
        ass.ActualCompletionDate,
        'ACTION_COMPLETED',
        'Action "' + a.ActionTitle + '" was completed',
        u.FullName,
        r.RoleName
    FROM CAPAAssignments ass
    JOIN CAPAActions a ON ass.ActionID = a.ActionID
    LEFT JOIN Users u ON a.AssignedTo = u.UserID
    LEFT JOIN Roles r ON u.RoleID = r.RoleID
    WHERE ass.CAPAID = @CAPAID AND ass.ActualCompletionDate IS NOT NULL;
    
    -- Effectiveness Checked
    INSERT INTO #Timeline (EventDate, EventType, EventDescription, PerformedBy, Role)
    SELECT 
        ass.EffectivenessCheckedAt,
        'EFFECTIVENESS_CHECKED',
        'Effectiveness for action "' + a.ActionTitle + '" was ' + CASE WHEN ass.IsEffective = 1 THEN 'confirmed' ELSE 'rejected' END,
        u.FullName,
        r.RoleName
    FROM CAPAAssignments ass
    JOIN CAPAActions a ON ass.ActionID = a.ActionID
    LEFT JOIN Users u ON ass.EffectivenessCheckedBy = u.UserID
    LEFT JOIN Roles r ON u.RoleID = r.RoleID
    WHERE ass.CAPAID = @CAPAID AND ass.EffectivenessCheckedAt IS NOT NULL;
    
    -- QC Tests
    INSERT INTO #Timeline (EventDate, EventType, EventDescription, PerformedBy, Role)
    SELECT 
        qr.TestedAt,
        'QC_TEST_COMPLETED',
        'QC Test "' + qr.TestName + '" result: ' + CASE WHEN qr.IsPassed = 1 THEN 'PASSED' ELSE 'FAILED' END,
        u.FullName,
        r.RoleName
    FROM QCTestResults qr
    LEFT JOIN Users u ON qr.TestedBy = u.UserID
    LEFT JOIN Roles r ON u.RoleID = r.RoleID
    WHERE qr.CAPAID = @CAPAID;
    
    -- COA Generated
    INSERT INTO #Timeline (EventDate, EventType, EventDescription, PerformedBy, Role)
    SELECT 
        coa.PreparedAt,
        'COA_GENERATED',
        'COA ' + coa.COA_Code + ' was generated',
        u.FullName,
        r.RoleName
    FROM COA coa
    LEFT JOIN Users u ON coa.PreparedBy = u.UserID
    LEFT JOIN Roles r ON u.RoleID = r.RoleID
    WHERE coa.CAPAID = @CAPAID;
    
    -- COA Approved
    INSERT INTO #Timeline (EventDate, EventType, EventDescription, PerformedBy, Role)
    SELECT 
        coa.ApprovedAt,
        'COA_APPROVED',
        'COA ' + coa.COA_Code + ' was approved with result: ' + coa.Result,
        u.FullName,
        r.RoleName
    FROM COA coa
    LEFT JOIN Users u ON coa.ApprovedBy = u.UserID
    LEFT JOIN Roles r ON u.RoleID = r.RoleID
    WHERE coa.CAPAID = @CAPAID;
    
    -- Final Result
    SELECT * FROM #Timeline ORDER BY EventDate;
    
    DROP TABLE #Timeline;
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_GetDetailsBySalesId]    Script Date: 5/11/2026 12:07:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE  procedure [dbo].[sp_GetDetailsBySalesId]
(@SalesId nvarchar(max),
 @DataAreaid  nvarchar(10))
as

declare @Site nvarchar(10)

select 
      
     @Site=[SiteName]
       FROM [Sites]
       where [SiteID]=@DataAreaid
       and IsActive=1


select ct.ACCOUNTNUM ,ct.NAME from [MATCOAX].[dbo].CustTable as ct inner join [MATCOAX].[dbo].SalesTable as st
on ct.ACCOUNTNUM=st.CUSTACCOUNT and ct.DataAreaid=st.DataAreaid 
where ct.DataAreaid=@Site and BLOCKED!=2 --and CURRENCY='PKR' 

and REPLACE(LOWER(st.SalesId), 'sop-', '') = LOWER(@SalesId)



select  sln.SalesId as SALESID,sln.ITEMID ,sln.NAME  as LineNAME,
 It.ITEMNAME as NAME  ,Iv.NAME as ItemVarityName ,It.ITEMVARIETYID

  from [MATCOAX].[dbo].SalesTable as st inner join [MATCOAX].[dbo].SalesLine as  
sln  on  St.SALESID=sln.SALESID and  st.DataAreaid=sln.DataAreaid inner join
  [MATCOAX].[dbo].InventTable as It  on It.ITEMID=sln.ITEMID  and It.DataAreaid=sln.DataAreaid 
inner join [MATCOAX].[dbo].InventItemVariety as Iv on  It.ITEMVARIETYID=Iv.ITEMVARIETYID
and Iv.DATAAREAID=It.DATAAREAID

where sln.DataAreaid='rgd' and REPLACE(LOWER(sln.SalesId), 'sop-', '') = LOWER(@SalesId)



--sln.DataAreaid='rgd'  and sln.SalesId='SOP-014465'

--exec sp_GetDetailsBySalesId  '013869' , '1'
GO
/****** Object:  StoredProcedure [dbo].[sp_GetMenusByRole]    Script Date: 5/11/2026 12:07:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_GetMenusByRole]
    @RoleID NVARCHAR(50)
AS
BEGIN
    -- MENUS
    SELECT 
        M.Id,
        M.Title,
        M.Url,
        M.ParentId,
        M.Icon
    FROM MenuItems M
    JOIN RoleMenus RM ON M.Id = RM.MenuId
    WHERE RM.RoleId = @RoleId
      AND M.IsActive = 1;

    ---- PERMISSIONS
    --SELECT RP.PermissionId
    --FROM Permissions P
    --JOIN RolePermissions RP ON P.Id = RP.PermissionId
    --WHERE RP.RoleId = @RoleId;
      
END


-- exec [sp_GetMenusByRole] 1
GO
/****** Object:  StoredProcedure [dbo].[sp_GetProductDetailByID]    Script Date: 5/11/2026 12:07:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE Procedure [dbo].[sp_GetProductDetailByID]
(@Id int)
as
SELECT Products.[Id]
      ,[ProductName]
      ,[ProductCode]
      ,[CategoryID]
      ,[FormID]
      ,[ColorID]
      ,Forms.Name as FormName
       ,Colors.Name as ColorName
        ,Categories.Name as CategoryName
      ,[CountryOfOrigin]
      ,[Ingredients]
      ,[IngredientsDeclaration]
      ,[SuitableFor]
      ,[Additives]
      ,[Functionalities]
      ,[Description]
      ,[ShelfLife]
      ,[StorageConditions]
      ,[Uses]
      ,[CreatedAt]
      ,Products.[IsActive] as IsActive
  FROM Products inner join Forms on  Forms.Id=Products.FormID
  inner join Colors on  Colors.Id=Products.ColorID
  inner join Categories on  Categories.Id=Products.CategoryID 
  where  Products.[Id]=@Id
  
  
 -- exec sp_GetProductDetailByID 1
GO
/****** Object:  StoredProcedure [dbo].[sp_GetUserAssignments]    Script Date: 5/11/2026 12:07:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- 12. Get Assignments by User
CREATE PROCEDURE [dbo].[sp_GetUserAssignments]
    @UserID INT
AS
BEGIN
    SELECT a.*, c.Title as CAPATitle, rc.RootCauseTitle
    FROM Assignments a
    JOIN CAPA c ON a.CAPAID = c.CAPAID
    JOIN RootCauses rc ON a.RootCauseID = rc.RootCauseID
    WHERE a.AssignedTo = @UserID AND a.ActionTaken = 0
    ORDER BY a.AssignedAt DESC;
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_GetUsersByRoleAndDept]    Script Date: 5/11/2026 12:07:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- 12. Get Users by Role and Department
CREATE PROCEDURE [dbo].[sp_GetUsersByRoleAndDept]
    @RoleID INT = NULL,
    @DepartmentID INT = NULL
AS
BEGIN
    SELECT 
        u.UserID, u.UserCode, u.FullName, u.Email, u.PhoneNumber,
        r.RoleID, r.RoleName, r.RoleCode,
        d.DepartmentID, d.DepartmentName, d.DepartmentCode
    FROM Users u
    INNER JOIN Roles r ON u.RoleID = r.RoleID
    INNER JOIN Departments d ON u.DepartmentID = d.DepartmentID
    WHERE u.IsActive = 1
    AND (@RoleID IS NULL OR u.RoleID = @RoleID)
    AND (@DepartmentID IS NULL OR u.DepartmentID = @DepartmentID)
    ORDER BY d.DepartmentName, r.RoleLevel DESC, u.FullName;
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_LoginUser]    Script Date: 5/11/2026 12:07:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_LoginUser]
    @Email NVARCHAR(100),
    @SiteID NVARCHAR(10)
AS
BEGIN
    SELECT U.UserID, U.FullName as Username, U.Email, U.PasswordHash, R.RoleName ,UR.RoleId ,UA.SiteID , U.DepartmentId
    FROM Users U
    JOIN Roles UR ON U.RoleID = UR.RoleID
    JOIN Roles R ON UR.RoleId = R.RoleID
    inner join UserSiteAccess UA on  UA.UserId=U.UserID
    WHERE U.Email =@Email AND U.IsActive = 1  and UA.SiteID=@SiteID
    and UA.IsActive = 1 
END;



--exec [sp_LoginUser] 'muhammad.ali@matcofoods.com.pk' ,1
GO
/****** Object:  StoredProcedure [dbo].[sp_Packaging_Delete]    Script Date: 5/11/2026 12:07:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_Packaging_Delete]
    @Id INT
AS
BEGIN
    DELETE FROM Packaging WHERE Id = @Id
END
GO
/****** Object:  StoredProcedure [dbo].[sp_Packaging_GetAllByProductId]    Script Date: 5/11/2026 12:07:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create PROCEDURE [dbo].[sp_Packaging_GetAllByProductId]
(@ProductId int)
AS
BEGIN
    SELECT Packaging.Id, ProductId, Material,NetWeight, Packaging.IsActive ,Products.ProductName
    FROM Packaging inner join  Products
    on Products.Id=Packaging.ProductId 
    
    where ProductId=@ProductId
END


--exec  [sp_Packaging_GetAllByProductId] 1
GO
/****** Object:  StoredProcedure [dbo].[sp_Packaging_Insert]    Script Date: 5/11/2026 12:07:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_Packaging_Insert]
    @ProductId INT,
    @Material NVARCHAR(200),
     @NetWeight  NVARCHAR(200),
    @IsActive BIT
AS
BEGIN
    INSERT INTO Packaging (ProductId, Material,NetWeight, IsActive)
    VALUES (@ProductId, @Material,@NetWeight, @IsActive)

    SELECT SCOPE_IDENTITY() AS Id
END
GO
/****** Object:  StoredProcedure [dbo].[sp_Packaging_Update]    Script Date: 5/11/2026 12:07:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_Packaging_Update]
    @Id INT,
    @ProductId INT,
    @Material NVARCHAR(200),
    @NetWeight NVARCHAR(200),
    @IsActive BIT
AS
BEGIN
    UPDATE Packaging
    SET 
        ProductId = @ProductId,
        Material = @Material,
        NetWeight=@NetWeight,
        IsActive = @IsActive
    WHERE Id = @Id
END
GO
/****** Object:  StoredProcedure [dbo].[sp_Product_Delete]    Script Date: 5/11/2026 12:07:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_Product_Delete]
    @Id INT
AS


BEGIN
    IF NOT EXISTS (SELECT * FROM Products  WHERE Id =@Id )
BEGIN
    Select 'Product not founds'
END
ELSE
   BEGIN
   
   
   
DECLARE @count INT = 0;
DECLARE @msg NVARCHAR(MAX) = '';

-- COUNT TOTAL RECORDS
SELECT @count =
    (SELECT COUNT(*) FROM Certifications WHERE ProductId = @Id) +
    (SELECT COUNT(*) FROM Packaging WHERE ProductId = @Id) +
    (SELECT COUNT(*) FROM ProductAnalysis WHERE ProductId = @Id);

-- BUILD MESSAGE
IF EXISTS (SELECT 1 FROM Certifications WHERE ProductId = @Id)
    SET @msg = @msg + 'Certifications, ';

IF EXISTS (SELECT 1 FROM Packaging WHERE ProductId = @Id)
    SET @msg = @msg + 'Packaging, ';

IF EXISTS (SELECT 1 FROM ProductAnalysis WHERE ProductId = @Id)
    SET @msg = @msg + 'ProductAnalysis, ';

-- REMOVE LAST COMMA
IF LEN(@msg) > 0
    SET @msg = LEFT(@msg, LEN(@msg) - 2); -- remove ", "


   if(@count >0)
   begin
   select 'Delete records from : ' + @msg
   end
   
   else
   begin
     
	  DELETE FROM Products WHERE Id = @Id
	  Select 'Product has been deleted' 
	  
	  end

   END
END


--exec sp_Product_Delete 19
GO
/****** Object:  StoredProcedure [dbo].[sp_Product_Insert]    Script Date: 5/11/2026 12:07:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_Product_Insert]


  (         @ProductName nvarchar(200)
           ,@ProductCode nvarchar(50)
           ,@CategoryID int
           ,@FormID int
           ,@ColorID int
           ,@CountryOfOrigin  nvarchar(100)
           ,@Ingredients  nvarchar(max)
           ,@IngredientsDeclaration  nvarchar(max)
           ,@SuitableFor  nvarchar(200)
           ,@Additives  nvarchar(200)
           ,@Functionalities  nvarchar(200)
           ,@Description  nvarchar(max)
           ,@ShelfLife nvarchar(200)
           ,@StorageConditions nvarchar(max)
           ,@Uses nvarchar(max)
           ,@IsActive  bit
           )
 
 as 
 Begin
  INSERT INTO [dbo].[Products]
           ([ProductName]
           ,[ProductCode]
           ,[CategoryID]
           ,[FormID]
           ,[ColorID]
           ,[CountryOfOrigin]
           ,[Ingredients]
           ,[IngredientsDeclaration]
           ,[SuitableFor]
           ,[Additives]
           ,[Functionalities]
           ,[Description]
           ,[ShelfLife]
           ,[StorageConditions]
           ,[Uses]
           ,[IsActive])
     VALUES
           (@ProductName
           ,@ProductCode
           ,@CategoryID
           ,@FormID
           ,@ColorID
           ,@CountryOfOrigin
           ,@Ingredients
           ,@IngredientsDeclaration
           ,@SuitableFor
           ,@Additives
           ,@Functionalities
           ,@Description
           ,@ShelfLife
           ,@StorageConditions
           ,@Uses
           ,@IsActive)

           SELECT SCOPE_IDENTITY() AS Id


           end
GO
/****** Object:  StoredProcedure [dbo].[sp_Product_Update]    Script Date: 5/11/2026 12:07:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create PROCEDURE [dbo].[sp_Product_Update]


  (         
            @Id int,
            @ProductName nvarchar(200)
           ,@ProductCode nvarchar(50)
           ,@CategoryID int
           ,@FormID int
           ,@ColorID int
           ,@CountryOfOrigin  nvarchar(100)
           ,@Ingredients  nvarchar(max)
           ,@IngredientsDeclaration  nvarchar(max)
           ,@SuitableFor  nvarchar(200)
           ,@Additives  nvarchar(200)
           ,@Functionalities  nvarchar(200)
           ,@Description  nvarchar(max)
           ,@ShelfLife nvarchar(200)
           ,@StorageConditions nvarchar(max)
           ,@Uses nvarchar(max)
           ,@IsActive  bit
           )
 
 as 
 Begin
 update [dbo].[Products]
 
 set 
           [ProductName] =@ProductName
           ,[ProductCode]=@ProductCode
           ,[CategoryID]=@CategoryID
           ,[FormID]=@FormID
           ,[ColorID]=@ColorID
           ,[CountryOfOrigin]=@CountryOfOrigin
           ,[Ingredients]=@Ingredients
           ,[IngredientsDeclaration]=@IngredientsDeclaration
           ,[SuitableFor]=@SuitableFor
           ,[Additives]=@Additives
           ,[Functionalities]=@Functionalities
           ,[Description]=@Description
           ,[ShelfLife]=@ShelfLife
           ,[StorageConditions]=@StorageConditions
           ,[Uses]=@Uses
           ,[IsActive]=@IsActive
           
           where Id=@Id
     


           end
GO
/****** Object:  StoredProcedure [dbo].[sp_ProductAnalysis_Delete]    Script Date: 5/11/2026 12:07:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create PROCEDURE [dbo].[sp_ProductAnalysis_Delete]
    @Id INT
AS
BEGIN
    DELETE FROM ProductAnalysis WHERE Id = @Id
END
GO
/****** Object:  StoredProcedure [dbo].[sp_ProductAnalysis_GetAllByProductId]    Script Date: 5/11/2026 12:07:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_ProductAnalysis_GetAllByProductId]
(@ProductId int)
AS
BEGIN
SELECT ProductAnalysis.Id
      ,[ProductId]
      ,[CategoryId],
       CategoryName
      ,[ParameterName]
      ,[Unit]
      ,[Limits]
      ,[Status]
      ,ProductAnalysis.IsActive
  FROM ProductAnalysis  inner join AnalysisCategories
  on ProductAnalysis.CategoryId=AnalysisCategories.Id
  where ProductId=@ProductId
  
  end
  
  -- exec  sp_ProductAnalysis_GetAllByProductId 1
GO
/****** Object:  StoredProcedure [dbo].[sp_ProductAnalysis_Insert]    Script Date: 5/11/2026 12:07:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create PROCEDURE [dbo].[sp_ProductAnalysis_Insert]
    @ProductId INT,
    @CategoryId int,
    @ParameterName  NVARCHAR(200),
    @Unit NVARCHAR(50),
    @Limits NVARCHAR(50),
    @Status NVARCHAR(50),
    @IsActive BIT
AS
BEGIN
    INSERT INTO ProductAnalysis (ProductId, CategoryId,ParameterName,Unit ,Limits,[Status] , IsActive)
    VALUES (@ProductId, @CategoryId,@ParameterName,@Unit,@Limits,@Status , @IsActive)

    SELECT SCOPE_IDENTITY() AS Id
END
GO
/****** Object:  StoredProcedure [dbo].[sp_ProductAnalysis_Update]    Script Date: 5/11/2026 12:07:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create PROCEDURE [dbo].[sp_ProductAnalysis_Update]
    @Id INT,
    @ProductId INT,
    @CategoryId int,
    @ParameterName  NVARCHAR(200),
    @Unit NVARCHAR(50),
    @Limits NVARCHAR(50),
    @Status NVARCHAR(50),
    @IsActive BIT
AS
BEGIN
    UPDATE ProductAnalysis
    SET 
        ProductId = @ProductId,
        CategoryId = @CategoryId,
        ParameterName=@ParameterName,
        Unit=@Unit,
        Limits=@Limits,
        [Status]=@Status,
        IsActive = @IsActive
    WHERE Id = @Id
END
GO
/****** Object:  StoredProcedure [dbo].[sp_ProductsPagination]    Script Date: 5/11/2026 12:07:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_ProductsPagination]
    @page        INT,
    @size        INT,
    @search      NVARCHAR(MAX) = '',
    @orderBy     NVARCHAR(MAX) = 'Id',
    @orderDir    NVARCHAR(MAX) = 'DESC'
AS
BEGIN
    SET NOCOUNT ON;
    
    DECLARE @skip INT = (@size * @page) - @size;
    DECLARE @sql NVARCHAR(MAX);
    DECLARE @whereClause NVARCHAR(MAX) = '';
    
    
    -- Build WHERE clause if search is provided
    IF LTRIM(RTRIM(@search)) <> ''
    BEGIN
        SET @whereClause = N'WHERE LOWER(ProductName) LIKE ''%'' + LOWER(@search) + ''%''
                           OR LOWER(ProductCode) LIKE ''%'' + LOWER(@search) + ''%''  
                            OR LOWER(Categories.Name) LIKE ''%'' + LOWER(@search) + ''%'' 
                           
                              ';
    END
    
    -- Build complete query using ROW_NUMBER
    SET @sql = N'
    WITH PaginatedProduts AS (
        SELECT 
            U.*,Categories.Name as CategoryName ,


            ROW_NUMBER() OVER 
            (ORDER BY U.' + QUOTENAME(@orderBy) + ' ' + @orderDir + ') AS RowNum

        FROM dbo.Products U   inner join Categories on  Categories.Id=U.CategoryID 
        
       
        ' + @whereClause + '
    )

    SELECT * 
    FROM PaginatedProduts
    WHERE RowNum BETWEEN ' + CAST(@skip + 1 AS NVARCHAR(20)) + ' 
    AND ' + CAST(@skip + @size AS NVARCHAR(20)) + ';

    SELECT 
        (SELECT COUNT(*) FROM dbo.Products U ' + @whereClause + ') AS Filtered,
        (SELECT COUNT(*) FROM dbo.Products) AS Total;';
    -- Execute the query
    EXEC sp_executesql @sql, N'@search NVARCHAR(MAX)', @search;
END


--EXEC [sp_ProductsPagination] @page = 1, @size = 5
--EXEC [sp_ProductsPagination] @page = 1, @size = 1, @search = 'a'
--EXEC [sp_ProductsPagination] @page = 1, @size = 5, @search = 'a', @orderBy = 'ProductName', @orderDir = 'ASC'
--EXEC [sp_ProductsPagination] @page = 1, @size = 5, @search = '', @orderBy = 'ProductName', @orderDir = 'ASC'
GO
/****** Object:  StoredProcedure [dbo].[sp_RegisterUser]    Script Date: 5/11/2026 12:07:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_RegisterUser]
   
 (
 @username nvarchar(50),
 @email nvarchar(50),
 @passwordhash nvarchar(225),
 @rawpassword nvarchar(50),
 @role_id int,
 @departmentId int,
 @site_Ids nvarchar(50),
 @isActive bit

)
AS

BEGIN
    IF EXISTS (SELECT * FROM [Users]  WHERE email =@email  )
BEGIN
    Select 'Email Exists'
END
ELSE
   BEGIN
      insert into [Users](FullName,email,PasswordHash,RawPassword,isActive,DepartmentId  ) 
	  values(@username,@email,@passwordhash,@rawpassword,@isActive,@departmentId )

-- Capture first identity
DECLARE @UserID int = SCOPE_IDENTITY();

 insert into [UserSiteAccess]([UserID],[SiteID],[IsActive])
 
 --select @UserID,(select SiteID  from [Sites] where SiteCode= [Param] ), 1 from dbo.fun_splitstring(@site_Ids)
 
 
select @UserID,SiteID,1 from (
select [Param] from  dbo.fun_splitstring(@site_Ids) ) as tb
inner join [Sites] on LTRIM(RTRIM([Param]))=LTRIM(RTRIM(SiteID))



insert into [UserRoles]([UserID],[RoleID])

select  @UserID ,@role_id
 


	  Select 'New user has been created'

   END
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_UpdateCAPA]    Script Date: 5/11/2026 12:07:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create PROCEDURE [dbo].[sp_UpdateCAPA]
    @CAPAID INT,
    @Description NVARCHAR(MAX),
    @FromDepartmentID INT,
    @ToDepartmentID NVARCHAR(20),
    @ItemId NVARCHAR(50),
    @ItemVarietyID NVARCHAR(50),
    @Site NVARCHAR(10),
    @SalesId  NVARCHAR(50),
    @Customer NVARCHAR(50),
    @ItemName NVARCHAR(50)
  
AS
BEGIN
  
    
    update  CAPA  set  Description =@Description
    , FromDepartmentID=@FromDepartmentID
    ,ItemId =@ItemId
    ,ItemVarietyID =@ItemVarietyID
    ,Customer =@Customer
    ,SalesId =@SalesId
    ,Site =@Site ,
    ItemName =@ItemName
    
    where CAPAID=@CAPAID

    
 
    delete from EmailConcernDeparts
    where [CAPAID]=@CAPAID
    
    insert into  EmailConcernDeparts([CAPAID],[DepartmentID])
    
    select @CAPAID, DepartmentID from (
    select [Param] from  dbo.fun_splitstring(@ToDepartmentID) ) as tb
    inner join Departments on LTRIM(RTRIM([Param]))=LTRIM(RTRIM(DepartmentID))
    
    
    
    SELECT @CAPAID AS CAPAID ;
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_UpdateUser]    Script Date: 5/11/2026 12:07:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create PROCEDURE [dbo].[sp_UpdateUser]
   
 (
 @UserID int,
 @username nvarchar(50),
 @email nvarchar(50),
 @passwordhash nvarchar(225),
 @rawpassword nvarchar(50),
 @role_id int,
 @departmentId int,
 @site_Ids nvarchar(50),
 @isActive bit

)
AS

BEGIN
    IF NOT EXISTS (SELECT * FROM [Users]  WHERE  UserID=@UserID )
BEGIN
    Select 'User does not exists'
END
ELSE
   BEGIN
      
	  
	  update [Users]  set  FullName=@username  ,email=@email ,PasswordHash= @passwordhash,
	                       RawPassword=RawPassword, isActive=@isActive  ,DepartmentId=@departmentId  ,RoleID=@role_id
	                       where  UserID=@UserID 
	                       
	                       
	                        
delete from [UserSiteAccess] where [UserID]=@UserID

 insert into [UserSiteAccess]([UserID],[SiteID],[IsActive])
 
 --select @UserID,(select SiteID  from [Sites] where SiteCode= [Param] ), 1 from dbo.fun_splitstring(@site_Ids)
 
 
select @UserID,SiteID,1 from (
select [Param] from  dbo.fun_splitstring(@site_Ids) ) as tb
inner join [Sites] on LTRIM(RTRIM([Param]))=LTRIM(RTRIM(SiteID))


 
	  Select 'New user has been created'

   END
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_UserPagination]    Script Date: 5/11/2026 12:07:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[usp_UserPagination]
    @page        INT,
    @size        INT,
    @search      NVARCHAR(MAX) = '',
    @orderBy     NVARCHAR(MAX) = 'UserID',
    @orderDir    NVARCHAR(MAX) = 'DESC'
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @skip INT = (@size * @page) - @size;
    DECLARE @sql NVARCHAR(MAX);
    DECLARE @whereClause NVARCHAR(MAX) = N'';

    -- SAFE ORDER DIR
    IF UPPER(@orderDir) NOT IN ('ASC','DESC')
        SET @orderDir = 'DESC';

    -- SAFE SEARCH FILTER
    IF LTRIM(RTRIM(@search)) <> ''
    BEGIN
        SET @whereClause = N'
        WHERE 
            LOWER(U.FullName) LIKE ''%'' + LOWER(@search) + ''%''
         OR LOWER(U.Email) LIKE ''%'' + LOWER(@search) + ''%''
         OR LOWER(D.DepartmentName) LIKE ''%'' + LOWER(@search) + ''%''
        ';
    END

    SET @sql = N'
    WITH PaginatedUsers AS (
        SELECT 
            U.UserID,
           U.FullName as Username,
            U.Email,
            U.IsActive,
            U.CreatedAt,
            U.DepartmentId,
            U.RawPassword,
            R.RoleID,
            R.RoleName,
            D.DepartmentName,
              
            COALESCE(CAST(D.DepartmentId AS NVARCHAR), ''No Department'') AS DeptId,

            (
                SELECT STUFF((
                    SELECT '', '' + S.SiteName
                    FROM Sites S
                    INNER JOIN UserSiteAccess USA ON USA.SiteID = S.SiteID
                    WHERE USA.UserID = U.UserID
                    FOR XML PATH(''''), TYPE
                ).value(''.'', ''NVARCHAR(MAX)''),1,2,'''')
            ) AS SiteNames,

            (
                SELECT STUFF((
                    SELECT '', '' + CAST(S.SiteID AS VARCHAR(10))
                    FROM Sites S
                    INNER JOIN UserSiteAccess USA ON USA.SiteID = S.SiteID
                    WHERE USA.UserID = U.UserID
                    FOR XML PATH(''''), TYPE
                ).value(''.'', ''NVARCHAR(MAX)''),1,2,'''')
            ) AS SiteIDs,

            ROW_NUMBER() OVER (
                ORDER BY U.' + QUOTENAME(@orderBy) + ' ' + @orderDir + '
            ) AS RowNum

        FROM dbo.Users U
       
        INNER JOIN Roles R ON R.RoleID = U.RoleID
        INNER JOIN Departments D ON U.DepartmentId = D.DepartmentId
        ' + @whereClause + '
    )

    SELECT *
    FROM PaginatedUsers
    WHERE RowNum BETWEEN ' + CAST(@skip + 1 AS NVARCHAR(20)) + ' 
                     AND ' + CAST(@skip + @size AS NVARCHAR(20)) + ';

    SELECT 
        (
            SELECT COUNT(*)
            FROM dbo.Users U
          
             INNER JOIN Roles R ON R.RoleID = U.RoleID
            INNER JOIN Departments D ON U.DepartmentId = D.DepartmentId
            ' + @whereClause + '
        ) AS Filtered,

        (SELECT COUNT(*) FROM dbo.Users) AS Total;
    ';

    EXEC sp_executesql @sql, N'@search NVARCHAR(MAX)', @search;
END

--EXEC [usp_UserPagination] @page = 1, @size = 5
--EXEC [usp_UserPagination] @page = 1, @size = 1, @search = 'a'
--EXEC [usp_UserPagination] @page = 1, @size = 5, @search = 'a', @orderBy = 'username', @orderDir = 'ASC'
--EXEC [usp_UserPagination] @page = 1, @size = 5, @search = '', @orderBy = 'username', @orderDir = 'ASC'
GO
USE [master]
GO
ALTER DATABASE [TQMS] SET  READ_WRITE 
GO
